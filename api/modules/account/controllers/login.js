import AppError from "../../../errors/AppError.js";
import { extractBody } from "./../../../utils/index.js";
import { AuthenticateUserUseCase } from "./../../account/useCases/authenticateUserUseCase.js";
import buildResponse from "./../../../utils/buildResponse.js";
import buildErrorResponse from "../../../utils/buildErrorResponse.js";

export const handler = async (event) => {
  const { username, password } = extractBody(event);
  const authenticateUserUseCase = new AuthenticateUserUseCase();

  try {
    const token = await authenticateUserUseCase.execute(username, password);
    return buildResponse({ accessToken: token }, 200);
  } catch (err) {
    return buildErrorResponse(err);
  }
};
