const { Flower, FlowerPicture} = require("../models/Models");
const ApiError = require("../error/ApiError");

let flowerController = this;

class FlowerController {
    constructor() {
        flowerController = this;
    }

    async getFlowers(req, res, next) {
        let {name, email, password, phone} = req.body;

        return res
            .status(200)
            .json({ message: "hi!" });
    }


    async createFlower(req, res, next){
        const {name, description, count, price, pictures} = req.body
        const flower = await Flower.findOne({ where: { name } });
        let createdFlower;
        if(flower){
            return next(ApiError.badRequest("This flower is already created!"));
        }
        createdFlower = await Flower.create({ name, description, count, price });
        const picturesDB = [];
        for (let picture of pictures) {
            if (picture) {
                let dbPicture = await FlowerPicture.create({ picture })
                picturesDB.push(dbPicture)
            }
        }
        await createdFlower.setPictures(picturesDB);
        return res.json(createdFlower)
    }



}
module.exports = new FlowerController();