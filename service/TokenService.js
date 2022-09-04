const jwt = require('jsonwebtoken')
const {RefreshToken} = require('../models/Models')
const {where} = require('sequelize')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '30m',
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d',
        })
        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(user, refreshToken) {
        const tokenData = await user.getRefreshToken()
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return await tokenData.save()
        }
        const token = await RefreshToken.create({refreshToken: refreshToken})
        await token.setUser(user)
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await RefreshToken.destroy({where: {refreshToken}})
    }

    validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    async findRefreshToken(refreshToken) {
        refreshToken = await RefreshToken.findOne({where: {refreshToken}})
        return refreshToken
    }
}

module.exports = new TokenService();