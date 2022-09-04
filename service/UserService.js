const {User} = require('../models/Models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const tokenService = require('./TokenService')
const UserDto = require('../dtos/UserDto')

let userService = this

class UserService {
    constructor() {
        userService = this
    }

    async registration(name, email, password, phone) {
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            throw ApiError.badRequest(`User with ${email} email is already exist!`, {
                field: 'email',
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
        })
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(user, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async login(email, password) {
        const candidate = await User.findOne({where: {email}})
        if (!candidate) {
            throw ApiError.badRequest(`User with ${email} email doesn't exist!`, {
                field: 'email',
            })
        }
        const isPasswordsEquals = await bcrypt.compare(password, candidate.password)
        if (!isPasswordsEquals) {
            throw ApiError.badRequest('Password is incorrect!', {field: 'password'})
        }
        const userDto = new UserDto(candidate)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(candidate, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = tokenService.findRefreshToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorizedError()
        }
        const candidate = await User.findOne({where: {email: userData.email}})
        const userDto = new UserDto(candidate)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(candidate, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async getUser(email) {
        return await User.findOne({where: {email}})
    }
}

module.exports = new UserService()