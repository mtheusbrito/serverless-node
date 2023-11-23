import { pbkdf2Sync } from "node:crypto";
import { connectDatabase } from "../config/db-connect.js";
export const ensureAuthenticated = async (event) => {
  const { authorization } = event.headers;

  if (!authorization) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Missing authorization header" }),
    };
  }

  const [type, credentials] = authenticated.split(" ");

  if (type !== "Basic") {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Unsupported authorization type" }),
    };
  }

  //   username:password
  const [username, password] = Buffer.from(credentials, "base64")
    .toString()
    .split(":");

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

  return {
    id: user._id,
    username: user.username,
  };
};
