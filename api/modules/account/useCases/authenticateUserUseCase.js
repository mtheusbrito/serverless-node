import { UsersRepository } from "../repositories/usersRepository.js";
import InvalidCredentials from "../../../errors/InvalidCredentials.js";
import { pbkdf2Sync } from "node:crypto";
import pkg from "jsonwebtoken";

export class AuthenticateUserUseCase {
  constructor() {
    this.repository = new UsersRepository();
  }

  execute = async (username, password) => {
    
    const user = await this.repository.findUserByUsername(username);
    if (!user) {
      throw new InvalidCredentials();
    }

    const { sign } = pkg;

    const hashedPass = pbkdf2Sync(
      password,
      process.env.SALT,
      100000,
      64,
      "sha512"
    ).toString("hex");

    if (user.password !== hashedPass) {
      throw new InvalidCredentials();
    }

    const token = sign({ username, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
      audience: "activities-serverless",
    });

    return token;
  };
}
