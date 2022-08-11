const {ProductType, ProductPicture, Product} = require("../models/Models");
const ApiError = require("../error/ApiError");
const {Op, Sequelize} = require("sequelize");


let productService = this;

class ProductService {

    constructor() {
        productService = this;
    }

    async createProduct(name, description, productType, count, price, pictures, isFlower) {
        let createdProduct
        let productTypeDb
        try {
            createdProduct = await Product.create({name, description, count, price, isFlower});
        } catch (e) {
            throw ApiError.badRequest("This product is already created!");
        }
        productTypeDb = await ProductType.findOne({where: {name: productType}})
        if (!productTypeDb) productTypeDb = await ProductType.create({name: productType})
        const picturesDB = [];
        for (let picture of pictures) {
            if (picture) {
                let dbPicture = await ProductPicture.create({picture})
                picturesDB.push(dbPicture)
            }
        }
        await createdProduct.setPictures(picturesDB);
        await createdProduct.setProductType(productTypeDb)
        return createdProduct
    }



    async getProductsWithType(types, minPrice, maxPrice, limit, offset) {
        const whereExpression = {
            price: {
                [Op.gte]: minPrice !== -1 ? minPrice : 0,
                [Op.lte]: maxPrice !== -1 ? maxPrice : Number.MAX_VALUE
            }
        }
        const includeExpression = [
            {
                model: ProductType,
                as: 'productType',
                attributes: [],
                where: {name: types},

            },
            {
                model: ProductPicture,
                as: 'pictures',
                attributes: ['picture']
            }
        ]
        let filterExpression = ''
        for (let type of types) {
            if (types[0] === type) filterExpression += `name='${type}'`
            filterExpression += `, "productType".name='${type}'`
        }
        const orderExpression =
            [
                [{model: ProductType, as: 'productType'}, Sequelize.literal(filterExpression)],
                ['updatedAt', 'ASC']
            ]
        const count = await Product.count({
            where: whereExpression,
            include: includeExpression
        });
        const products = productService.getProducts(whereExpression, includeExpression, orderExpression, limit, offset)
        return {products, count}
    }


    async getRecommendationProducts(limit) {
        return productService.getProducts(
            {},
            [
                {
                    model: ProductPicture,
                    as: 'pictures',
                    attributes: ['picture']
                }
            ],
            Sequelize.literal('random()'),
            Number(limit),
            0
        )
    }


    async getProducts(whereExpression, includeExpression, orderExpression, limit, offset) {
        const products = await Product.findAll({
            where: whereExpression,
            limit: limit,
            offset: offset,
            subQuery: false,
            include: includeExpression,
            order: orderExpression
        })
        return products
    }

    async getProductsTypes(isFlower) {
        const productsTypes = await ProductType.findAll({
            attributes: ['name'],
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: [],
                    where: {isFlower}
                }
            ]
        });
        return productsTypes
    }
}

module.exports = new ProductService()