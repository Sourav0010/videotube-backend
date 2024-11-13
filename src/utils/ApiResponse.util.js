class ApiResponse {
    constructor(statusCode, data, message) {
        this.status = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 300
    }
}

export default ApiResponse
