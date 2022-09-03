const basketService = require("../service/BasketService")
const mailService = require("../service/MailService")

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
            const result = await basketService.addProduct(id, count, email);
            const newCount = result.count
            return res.json({count: newCount, message: result?.message});
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

    async completeOrder(req, res, next) {
        try {
            let {email, name, phone, city} = req.body;
            await mailService.sendOrderDoneMail(name, email, phone, city)
            await basketService.clearBasket(email);

            return res.json({ message: 'Success!' });
        } catch (e) {
            next(e)
        }
    }


}

module.exports = new BasketController();