"use strict";
import { connectDatabase } from "./config/db-connect.js";
import { ObjectId } from "mongodb";

const handler = async (event) => {
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
