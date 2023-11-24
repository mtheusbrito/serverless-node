import pkg from "jsonwebtoken";
import buildResponse from "../utils/buildResponse.js";
import InvalidCredentials  from './../errors/InvalidCredentials.js'

export const ensureAuthenticated = (event) => {
  const { authorization } = event.headers;
  const { verify } = pkg;
  if (!authorization) {
   throw new InvalidCredentials("Missing authorization header")
  }

  const [type, token] = authorization.split(" ");
  if (type !== "Bearer" || !token) {
   throw new InvalidCredentials("Unsupported authorization type")
  }
  try {
    const { username, id } = verify(token, process.env.JWT_SECRET, {
      audience: "activities-serverless",
    });
  } catch (err) {
    throw new InvalidCredentials("Invalid Token")
  }

};
