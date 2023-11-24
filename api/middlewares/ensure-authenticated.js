import { pbkdf2Sync } from "node:crypto";
import { connectDatabase } from "../config/db-connect.js";
import pkg from "jsonwebtoken";
export const ensureAuthenticated = async (event) => {
  const { authorization } = event.headers;
  const { verify } = pkg;
  if (!authorization) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Missing authorization header" }),
    };
  }

  const [type, token] = authorization.split(" ");
  if (type !== "Bearer" || !token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Unsupported authorization type" }),
    };
  }

  try {
   const {username, id } =  verify(token, process.env.JWT_SECRET, {
      audience: "activities-serverless",
    });
 
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Invalid token" }),
    };
  }

  return true;
};
