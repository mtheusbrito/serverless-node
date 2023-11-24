"use strict";
import { ensureAuthenticated } from "../../../middlewares/ensure-authenticated.js";
import  FindResultByIdUseCase  from "../useCases/findResultByIdUseCase.js";
import buildErrorResponse from "../../../utils/buildErrorResponse.js";
import buildResponse from "../../../utils/buildResponse.js";

const findResultByIdUseCase = new FindResultByIdUseCase();
const handler = async (event) => {
  try {
    ensureAuthenticated(event);

    const { id } = event.pathParameters;
    const result = await findResultByIdUseCase.execute(id);
    return buildResponse(result, 200);
  } catch (err) {
    return buildErrorResponse(err);
  }
};

export { handler };
