"use strict";
import { connectDatabase } from "./config/db-connect.js";
import { ObjectId } from "mongodb";
import { ensureAuthenticated } from "./middlewares/ensure-authenticated.js";

const handler = async (event) => {

  const authResult = await ensureAuthenticated(event);
  if(authResult.statusCode === 401) return authResult;

  const client = await connectDatabase();
  const collection = await client.collection("results");

  const result = await collection.findOne({
    _id: new ObjectId(event.pathParameters.id),
  });
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

export { handler };
