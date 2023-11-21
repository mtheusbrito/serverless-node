'use strict'
import { previousResults } from "./utils.js"


const handler = async (event) => {
  const result = previousResults.get(event.pathParameters.id);
  if (!result) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Result not found" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(result),
    headers: {
        "Content-Type": "application/json",
      },
  };
};

export { handler }
