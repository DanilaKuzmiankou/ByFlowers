const { User } = require("../models/Models");
const bcrypt = require('bcrypt');
const tokenService = require('../service/TokenService')

let userController = this;

class UserController {
    constructor() {
        userController = this;
    }

    async registration(req, res, next) {
        let {name, email, password, phone} = req.body;

        console.log('registr: ', name, email, password, phone)
        if (!name || name === "") {
            name = "New user";
        }

        /*if (!authId) {
            return next(
                ApiError.badRequest(
                    "There is no authId!",
                    " user.sub, user.name, user.picture ",
                    authId,
                    username,
                    picture
                )
            );
        }*/
        const candidate = await User.findOne({ where: {email}  });
        if (candidate) {
            return res
                .status(200)
                .json({ message: "User was successfully logged in!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone
        });
        const token = tokenService.generateTokens({email: email, name: name})
        console.log('token:', token)
        return res
            .status(200)
            .json({ message: "User was successfully registered!" });
    }

    async hashPassword(password){
        const salt = await bcrypt.genSalt(10)
    }



}
module.exports = new UserController();