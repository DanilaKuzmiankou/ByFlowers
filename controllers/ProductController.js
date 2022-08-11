const productService = require("../service/ProductService");

let productController = this;

class ProductController {
    constructor() {
        productController = this;
    }

    async getProductsTypes(req, res, next) {
        try {
            const {isFlower} = req.query
            const types = productService.getProductsTypes(isFlower)
            return res.json(types)
        } catch (e) {
            next(e)
        }
    }

async getProductsWithType(req, res, next) {
        try {
            let {types, minPrice, maxPrice, limit, offset} = req.query
            minPrice = Number(minPrice)
            maxPrice = Number(maxPrice)
            limit = Number(limit)
            offset = Number(offset)
            types = types.split(',')
            const products = productService.getProductsWithType(types, minPrice, maxPrice, limit, offset)
            return res.json(products);
        } catch (e) {
            next(e)
        }
    }

    async getRecommendationProducts(req, res, next) {
        try {
            const {limit} = req.query
            const products = productService.getRecommendationProducts(limit)
            return res.json(products);
        } catch (e) {
            next(e)
        }
    }

    async createProduct(req, res, next) {
        try {
            const {name, description, productType, count, price, pictures, isFlower} = req.body
            const product = productService.createProduct(name, description, productType, count, price, pictures, isFlower)
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }


}

module.exports = new ProductController();