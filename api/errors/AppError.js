export default class AppError extends Error {

  constructor(message, statusCode = 404) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
