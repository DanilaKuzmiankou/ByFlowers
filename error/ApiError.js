const logger = require("../logger");


class ApiError extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static unauthorizedError() {
        return new ApiError(401, 'User is not authorized')
    }

    static badRequest(message, errors) {
        logger.error(message)
        return new ApiError(404, message, errors)
    }

    static forbidden(message) {
        logger.error(message)
        return new ApiError(403, message)
    }

    static serverError(message) {
        logger.error(message)
        return new ApiError(500, message)
    }
}

module.exports = ApiError