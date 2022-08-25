const Router = require("express");
const router = new Router();
const productController = require("../controllers/ProductController");

router.get("/productsTypes", productController.getProductsTypes);
router.get("/products", productController.getProductsWithType);
router.post("/create", productController.createProduct)
router.get("/recommendationProducts", productController.getRecommendationProducts)
router.get("/product", productController.getProductById);

module.exports = router;
