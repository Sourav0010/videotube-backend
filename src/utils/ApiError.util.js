class ApiError extends Error {
    constructor(
        statusCode,
        message = 'Something went wrong',
        errors = [],
        stack = ''
    ) {
        super(message)
        this.data = null
        this.message = message
        this.statusCode = statusCode
        this.success = false
        this.errors = errors
        this.stack = stack || Error.captureStackTrace(this, this.constructor)
    }
}

export default ApiError
