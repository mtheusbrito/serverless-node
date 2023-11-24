import AppError from "../errors/AppError.js";
import buildResponse from "./buildResponse.js";

const buildErrorResponse = (err) => {
  if (err instanceof AppError) {
    return buildResponse({ message: err.message }, err.statusCode);
  } else {
    return buildResponse({ message: "Internal Server Error" }, 500);
  }
};
export default buildErrorResponse;