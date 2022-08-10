const Router = require("express");
const router = new Router();
const productController = require("../controllers/ProductController");

router.get("/flowersTypes", productController.getFlowersTypes);
router.get("/plantsTypes", productController.getPlantsTypes);
router.get("/products", productController.getProductsWithType);
router.post("/create", productController.createProduct)
router.get("/recommendationProducts", productController.getRecommendationProducts)

module.exports = router;
