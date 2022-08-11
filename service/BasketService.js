const {Basket} = require("../models/Models");
const ApiError = require("../error/ApiError");
const userService = require('./UserService')

let basketService = this;

class BasketService {

    constructor() {
        basketService = this;
    }


    async addProduct(productId, email) {
        const user = userService.getUser(email)
        const basket = user.getBasket()
        console.log('basket:', basket)
        //const product = Basket.create( {productId})
    }

}

module.exports = new BasketService()