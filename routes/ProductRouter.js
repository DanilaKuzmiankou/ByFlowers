const Router = require("express");
const router = new Router();
const productController = require("../controllers/ProductController");

router.get("/get", productController.getFlowers);
router.post("/create", productController.createProduct)


module.exports = router;
