const basketService = require("../service/BasketService")

let basketController = this;

class BasketController {
    constructor() {
        basketController = this;
    }

    async addProduct(req, res, next) {
        try {
            let {id, email, count} = req.body;
            id = Number(id)
            count = Number(count)
            const newCount = await basketService.addProduct(id, count, email);
            return res.json(newCount);
        } catch (e) {
            next(e)
        }
    }

    async getBasketProductCount(req, res, next) {
        try {
            let {id, email} = req.query;
            id = Number(id)
            const count = await basketService.getBasketProductCount(id, email);
            return res.json(count);
        } catch (e) {
            next(e)
        }
    }

    async getBasketProducts(req, res, next){
        try {
            const {email} = req.query
            const products = await basketService.getBasketProducts(email)
            return res.json(products)
        } catch (e) {
            next(e)
        }
    }

    async deleteProduct(req, res, next){
        try {
            const {email, id} = req.query
            const products = await  basketService.deleteProduct(email, id)
            return res.json(products)
        } catch (e) {
            next(e)
        }
    }


}

module.exports = new BasketController();