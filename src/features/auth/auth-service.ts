import { serverConfig } from "../../config/server-config.js";
import { BadRequestError } from "../../utils/error-types.js";
import { User } from "../user/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BlackListToken } from "./black-list-token-model.js";

export async function registerService(
  email: string,
  password: string,
  name: string,
  birthDay: Date,
  phoneNumber: string
): Promise<User> {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      throw new BadRequestError("Email already registered.");
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = User.create({
      email: email,
      password: hashedPassword,
      name: name,
      birthDay: birthDay,
      phoneNumber: phoneNumber,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
}

export async function loginService(
  email: string,
  password: string
): Promise<string> {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new BadRequestError("Email unregistered");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError("Email or password is invalid");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      serverConfig.JWT_KEY,
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    throw error;
  }
}

export async function logoutService(token: string) {
  try {
    const blackListToken = await BlackListToken.create({
      token: token,
    });
    return blackListToken;
  } catch (error) {
    throw error;
  }
}
