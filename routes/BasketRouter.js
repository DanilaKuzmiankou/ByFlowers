const Router = require("express");
const router = new Router();
const basketController = require("../controllers/BasketController");

//router.get("/flowersTypes", productController.getFlowersTypes);
router.post("/add", basketController.addProduct)
router.get("/count", basketController.getBasketProductCount)
router.get("/products", basketController.getBasketProducts)

module.exports = router;
