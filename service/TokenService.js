const jwt = require('jsonwebtoken');
const {RefreshToken} = require("../models/Models");

class TokenService {

    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(user, refreshToken){
        const tokenData = await user.getRefreshToken()
        console.log('token data:', tokenData)
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }
        const token = await RefreshToken.create({ refreshToken: refreshToken})
        user.setRefreshToken(token)
        return token
    }


}

module.exports = new TokenService();