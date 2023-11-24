import { connectDatabase } from "../../../config/db-connect.js";
import { extractBody } from "./../../../utils/index.js";
import pkg from "jsonwebtoken";
import { pbkdf2Sync } from "node:crypto";


export const handler = async (event) => {
  const { username, password } = extractBody(event);
  const { sign } = pkg;

  
  const hashedPass = pbkdf2Sync(
    password,
    process.env.SALT,
    100000,
    64,
    "sha512"
  ).toString("hex");

  const client = await connectDatabase();
  const collection = await client.collection("users");

  const user = await collection.findOne({
    username: username,
    password: hashedPass,
  });

  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Invalid credentials" }),
    };
  }

  const token = sign({ username, id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
    audience: "activities-serverless",
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessToken: token }),
  };
};
