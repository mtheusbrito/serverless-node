"use strict";
import { extractBody } from "./../../../utils/index.js";
import { ensureAuthenticated } from "../../../middlewares/ensure-authenticated.js";
import buildErrorResponse from "../../../utils/buildErrorResponse.js";
import SendResponseUseCase  from "../useCases/sendResponseUseCase.js";
import buildResponse from "../../../utils/buildResponse.js";

const sendResponseUseCase = new SendResponseUseCase();

const handler = async (event) => {
  try {
    ensureAuthenticated(event);

    const { name, answers } = extractBody(event);

    const { insertedId } = await sendResponseUseCase.execute(name, answers);

    return buildResponse(
      {
        resultId: insertedId,
        __hypermedia: {
          href: `/results.html`,
          query: { id: insertedId },
        },
      },
      201
    );
  } catch (err) {
    return buildErrorResponse(err);
  }
};

export { handler };
