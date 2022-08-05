const {Product, ProductPicture, ProductType} = require("../models/Models");
const ApiError = require("../error/ApiError");
const {Sequelize} = require("sequelize");
const {Op} = require("sequelize");

let productController = this;

class ProductController {
    constructor() {
        productController = this;
    }

    async getFlowersTypes(req, res, next) {
        return res
            .status(200)
            .json(await productController.getProduct(true));
    }

    async getPlantsTypes(req, res, next) {
        return res
            .status(200)
            .json(await productController.getProduct(false));
    }

    async getProduct(isFlower) {
        return ProductType.findAll({
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
    }

    async getProductsWithType(req, res, next) {
        let {types, minPrice, maxPrice, limit, offset} = req.query
        minPrice = Number(minPrice)
        maxPrice = Number(maxPrice)
        limit = Number(limit)
        offset = Number(offset)
        types = types.split(',')
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
        const products = await productController.getProducts(whereExpression, includeExpression, orderExpression, limit, offset)
        return res.json([products, count]);
    }


    getProducts(whereExpression, includeExpression, orderExpression, limit, offset) {
        return Product.findAll({
            where: whereExpression,
            limit: limit,
            offset: offset,
            subQuery: false,
            include: includeExpression,
            order: orderExpression
        })
    }

    async getRecommendationProducts(req, res, next) {
        const {limit} = req.query
        return res.json(await productController.getProducts(
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
        ))
    }


    async createProduct(req, res, next) {
        const {name, description, productType, count, price, pictures, isFlower} = req.body
        let createdProduct
        let productTypeDb
        try {
            createdProduct = await Product.create({name, description, count, price, isFlower});
        } catch (e) {
            return ApiError.badRequest("This product is already created!");
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
        return res.json(createdProduct)
    }


}

module.exports = new ProductController();