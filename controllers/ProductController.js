const { Product, ProductPicture} = require("../models/Models");
const ApiError = require("../error/ApiError");

let productController = this;

class ProductController {
    constructor() {
        productController = this;
    }

    async getFlowers(req, res, next) {
        let {name, email, password, phone} = req.body;

        return res
            .status(200)
            .json({ message: "hi!" });
    }


    async createProduct(req, res, next){
        const {name, description, count, price, pictures, isFlower} = req.body
        const product = await Product.findOne({ where: { name } });
        let createdProduct;
        if(product){
            return next(ApiError.badRequest("This product is already created!"));
        }
        createdProduct = await Product.create({ name, description, count, price, isFlower });
        const picturesDB = [];
        for (let picture of pictures) {
            if (picture) {
                let dbPicture = await ProductPicture.create({ picture })
                picturesDB.push(dbPicture)
            }
        }
        await createdProduct.setPictures(picturesDB);
        return res.json(createdProduct)
    }



}
module.exports = new ProductController();