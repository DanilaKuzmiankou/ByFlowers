const {Basket, BasketProduct, Product, ProductPicture} = require("../models/Models");
const ApiError = require("../error/ApiError");
const userService = require('./UserService')
const productService = require('./ProductService')
const {getBasketProducts} = require("../client/src/api/BasketApi");


let basketService = this;

class BasketService {

    constructor() {
        basketService = this;
    }


    async addProduct(productId, count, email) {
        const user = await userService.getUser(email)
        const product = await productService.getProductById(productId)
        if(!user || !product){
            throw ApiError.badRequest('Uhandled exception')
        }
        let basketProduct = await BasketProduct.findOne( {
            where: {
                productId: product.id,
                userId: user.id
            }
        })
        if(!basketProduct) {
            basketProduct = await BasketProduct.create({count, userId: user.id, productId: product.id})
            return product.count - basketProduct.count
        }
        basketProduct.set({
            count: basketProduct.count+count
        })
        await basketProduct.save()
        return product.count - basketProduct.count
    }

    async getBasketProductCount(productId, email) {
        const user = await userService.getUser(email)
        if(!user || !productId) {
            throw ApiError.badRequest('Uhandled exception')
        }
            const result = await BasketProduct.findOne({
                attributes: ['count'],
                where: {
                    userId: user.id,
                    productId
                }
            })
        if(!result) return 0
        return result.count
    }


    async getBasketProducts(email) {
        const user = await userService.getUser(email)
        const products = await BasketProduct.findAll({
            where: {
                userId: user.id
            },
            attributes: ['count'],
            include: [
                {
                    model: Product,
                    as: "product",
                    include: [
                        {
                            model: ProductPicture,
                            as: 'pictures',
                            attributes: ['picture']
                        }
                    ]
                }
            ]
        })
        console.log('serv: ', products)
        return products
        //const products = await user.getBasketProduct()
    }

    async deleteProduct(email, productId) {
        const user = await userService.getUser(email)
        await BasketProduct.destroy( {
            where:
                {
                    userId: user.id,
                    productId
                }
        })
        return getBasketProducts(email)
    }

}

module.exports = new BasketService()