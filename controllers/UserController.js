const userService = require("../service/UserService")

let userController = this;

class UserController {
    constructor() {
        userController = this;
    }

    async registration(req, res, next){
        try {
            const {name, email, password, phone} = req.body;
            const userData = await userService.registration(name, email, password, phone);
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60*60*1000, httpOnly:true })
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next){
        try {
            const {email, password } = req.body;
            const userData = await userService.login(email, password);
            console.log('res: ', userData)
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60*60*1000, httpOnly:true })
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60*60*1000, httpOnly:true })
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }




}


module.exports = new UserController();