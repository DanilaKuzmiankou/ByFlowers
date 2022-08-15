const {Basket, BasketProduct, Product, ProductPicture} = require("../models/Models");
const ApiError = require("../error/ApiError");
const userService = require('./UserService')
const productService = require('./ProductService')


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
        const result = await BasketProduct.findOne({
            attributes: ['count'],
            where: {
                userId: user.id,
                productId
            }
        })
        return result.count
    }


    async getBasketProductss(email) {
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
        return products
        //const products = await user.getBasketProduct()
    }

}

module.exports = new BasketService()