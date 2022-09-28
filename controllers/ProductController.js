const productService = require('../service/ProductService')

let productController = this

class ProductController {
    constructor() {
        productController = this
    }

    async getProductsTypes(req, res, next) {
        try {
            let {isFlower} = req.query
            isFlower = isFlower  === 'true'
            const types = await productService.getProductsTypes(isFlower)
            return res.json(types)
        } catch (e) {
            next(e)
        }
    }

    async getProductsWithType(req, res, next) {
        try {
            let {types, minPrice, maxPrice, limit, offset, orderExpression} =
              req.query
            minPrice = Number(minPrice)
            maxPrice = Number(maxPrice)
            limit = Number(limit)
            offset = Number(offset)
            types = types.split(',')
            const products = await productService.getProductsWithType(
              types,
              minPrice,
              maxPrice,
              limit,
              offset,
              orderExpression,
            )
            return res.json(products)
        } catch (e) {
            next(e)
        }
    }

    async getRecommendationProducts(req, res, next) {
        try {
            const {limit} = req.query
            const products = await productService.getRecommendationProducts(limit)
            return res.json(products)
        } catch (e) {
            next(e)
        }
    }

    async getNewestProducts(req, res, next) {
        try {
            const {limit} = req.query
            const products = await productService.getNewestProducts(limit)
            return res.json(products)
        } catch (e) {
            next(e)
        }
    }

    async createProduct(req, res, next) {
        try {
            const {
                name,
                description,
                productType,
                count,
                price,
                pictures,
                isFlower,
            } = req.body
            const product = await productService.createProduct(
              name,
              description,
              productType,
              count,
              price,
              pictures,
              isFlower,
            )
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }

    async getProductById(req, res, next) {
        try {
            const {id} = req.query
            const product = await productService.getProductById(id)
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProductController();