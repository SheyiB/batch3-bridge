class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode

    }
}


const errorHandler = async (err, res) => {

    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        message: err.message
    })

}


module.exports = {
    AppError,
    errorHandler
}