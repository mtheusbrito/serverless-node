import AppError from "./AppError.js";

export default class InvalidCredentials extends AppError {
  constructor(message = "Invalid credentials", statusCode = 401) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
