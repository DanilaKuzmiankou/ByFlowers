const Router = require("express");
const router = new Router();
const flowerController = require("../controllers/FlowerController");

router.get("/get", flowerController.getFlowers);
router.post("/create", flowerController.createFlower)


module.exports = router;
