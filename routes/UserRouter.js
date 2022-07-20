const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserController");

router.post("/registration", userController.registration);


module.exports = router;
