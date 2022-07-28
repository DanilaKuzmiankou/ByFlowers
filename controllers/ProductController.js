const { Product, ProductPicture, ProductType} = require("../models/Models");
const ApiError = require("../error/ApiError");
const {Sequelize} = require("sequelize");


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
            attributes: [ 'name' ],
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: [],
                    where: { isFlower }
                }
            ]
        });
    }

    async getProductsWithType(req, res, next) {
        let { types } = req.query
        types = types.split(',')
        let filterExpression=''
        for(let type of types){
            if(types[0]===type) filterExpression+=`name='${type}'`
            filterExpression+=`, "productType".name='${type}'`
        }
        return res.json(await Product.findAll({
            include: [
                {
                    model: ProductType,
                    as: 'productType',
                    attributes: [],
                    where: { name: types },

                },
                {
                    model: ProductPicture,
                    as: 'pictures',
                    attributes: ['picture']
                }
            ],
            order:[[{ model: ProductType, as: 'productType' } , Sequelize.literal(filterExpression)]]

        }));
    }


    async createProduct(req, res, next){
        const {name, description, productType, count, price, pictures, isFlower} = req.body
        let createdProduct
        let productTypeDb
        try {
            createdProduct = await Product.create({ name, description, count, price, isFlower });
        } catch (e) {
            console.log('e:', e)
            return next(ApiError.badRequest("This product is already created!"));
        }
        productTypeDb = await ProductType.findOne({where: {name: productType}})
        if(!productTypeDb) productTypeDb = await ProductType.create( {name: productType})
        const picturesDB = [];
        for (let picture of pictures) {
            if (picture) {
                let dbPicture = await ProductPicture.create({ picture })
                picturesDB.push(dbPicture)
            }
        }
        await createdProduct.setPictures(picturesDB);
        await createdProduct.setProductType(productTypeDb)
        return res.json(createdProduct)
    }



}
module.exports = new ProductController();