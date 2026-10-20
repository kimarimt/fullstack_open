class APIError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.name = 'APIError'
    this.statusCode = statusCode
  }
}

export default APIError