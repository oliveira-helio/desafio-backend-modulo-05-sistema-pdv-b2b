class AppError {
  message
  statusCode

  constructor(msg, statusCode) {
    this.message = msg
    this.statusCode = statusCode
  }
}

module.exports = AppError
