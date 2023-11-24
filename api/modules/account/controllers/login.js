import AppError from "../../../errors/AppError.js";
import { extractBody } from "./../../../utils/index.js";
import { AuthenticateUserUseCase } from "./../../account/useCases/authenticateUserUseCase.js";
import buildResponse from "./../../../utils/buildResponse.js";

export const handler = async (event) => {
  const { username, password } = extractBody(event);
  const authenticateUserUseCase = new AuthenticateUserUseCase();

  try {
    const token = await authenticateUserUseCase.handler(username, password);
    return buildResponse({ accessToken: token }, 200);
  } catch (err) {
    if (err instanceof AppError) {
      return buildResponse({ message: err.message }, err.statusCode);
    } else {
      return buildResponse({ message: "Inteernal Server Error" }, 500);
    }
  }
};
