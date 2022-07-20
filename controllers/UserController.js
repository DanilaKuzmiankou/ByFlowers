const { User } = require("../models/Models");

let userController = this;

class UserController {
    constructor() {
        userController = this;
    }

    async registration(req, res, next) {
        let {name, email, password, phone} = req.body;
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
        const user = await User.create({
            name,
            email,
            password,
            phone
        });
        return res
            .status(200)
            .json({ message: "User was successfully registered!" });
    }



}
module.exports = new UserController();