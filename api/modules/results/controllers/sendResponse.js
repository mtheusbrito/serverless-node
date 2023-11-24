"use strict";
import { extractBody } from "./../../../utils/index.js";

import { connectDatabase } from "../../../config/db-connect.js";
import { ensureAuthenticated } from "../../../middlewares/ensure-authenticated.js";
import buildErrorResponse from "../../../utils/buildErrorResponse.js";

const handler = async (event) => {
  try {
    ensureAuthenticated(event);

    const { name, answers } = extractBody(event);
    const correctQuestions = [3, 1, 0, 2];

    const totalCorrectAnswers = answers.reduce((acc, answer, index) => {
      if (answer === correctQuestions[index]) {
        acc++;
      }
      return acc;
    }, 0);

    const result = {
      name,
      answers,
      totalCorrectAnswers,
      totalAnswers: answers.length,
    };

    const client = await connectDatabase();
    const collection = await client.collection("results");

    const { insertedId } = await collection.insertOne(result);

    return {
      statusCode: 201,
      body: JSON.stringify({
        resultId: insertedId,
        __hypermedia: {
          href: `/results.html`,
          query: { id: insertedId },
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (err) {
    return buildErrorResponse(err);
  }
};

export { handler };
