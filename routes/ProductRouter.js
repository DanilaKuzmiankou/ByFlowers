const Router = require("express");
const router = new Router();
const productController = require("../controllers/ProductController");

router.get("/getFlowersTypes", productController.getFlowersTypes);
router.get("/getPlantsTypes", productController.getPlantsTypes);
router.get("/getProducts", productController.getProductsWithType);
router.post("/create", productController.createProduct)
router.get("/recommendationProducts", productController.getRecommendationProducts)

module.exports = router;
