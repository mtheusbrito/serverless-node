import { randomUUID } from "node:crypto";
import { extractBody, previousResults } from "./utils";





module.exports.handler = async (event) => {
  const { name, answers } = extractBody(event);
  const correctQuestions = [3, 1, 0, 2];

  const correctAnswers = answers.reduce((acc, answer, index) => {
    if (answer === correctQuestions[index]) {
      acc++;
    }
    return acc;
  }, 0);

  const result = {
    name,
    correctAnswers,
    totalAnswers: answers.length,
  };

  const resultId = randomUUID();
  previousResults.set(resultId, { response: extractBody(event), result });

  return {
    statusCode: 201,
    body: JSON.stringify({
      resultId,
      __hypermedia: {
        href: `/results.html`,
        query: { id: resultId },
      },
    }),

    headers: {
      "Content-Type": "application/json",
    },
  };
};
