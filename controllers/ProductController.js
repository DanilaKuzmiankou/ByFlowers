const { Product, ProductPicture, ProductType} = require("../models/Models");
const ApiError = require("../error/ApiError");

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
        return res.json(await Product.findAll({
            include: [
                {
                    model: ProductType,
                    attributes: [],
                    where: { name: types }
                },
                {
                    model: ProductPicture,
                    as: 'pictures',
                    attributes: ['picture']
                }
            ]
        }));
    }


    async createProduct(req, res, next){
        const {name, description, productType, count, price, pictures, isFlower} = req.body
        const product = await Product.findOne({ where: { name } });
        let createdProduct;
        if(product){
            return next(ApiError.badRequest("This product is already created!"));
        }
        createdProduct = await Product.create({ name, description, count, price, isFlower });
        await ProductType.create( {name: productType, productId: createdProduct.id })
        const picturesDB = [];
        for (let picture of pictures) {
            if (picture) {
                let dbPicture = await ProductPicture.create({ picture })
                picturesDB.push(dbPicture)
            }
        }
        await createdProduct.setPictures(picturesDB);
        return res.json(createdProduct)
    }



}
module.exports = new ProductController();