const basketService = require("../service/BasketService")

let basketController = this;

class BasketController {
    constructor() {
        basketController = this;
    }

    async addProduct(req, res, next) {
        try {
            const {id, email} = req.body;
            const product = await basketService.addProduct(id, email);
            return res.json('userData');
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new BasketController();