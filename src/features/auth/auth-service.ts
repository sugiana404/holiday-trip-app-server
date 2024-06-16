import { serverConfig } from "../../config/server-config.js";
import { BadRequestError, DataNotFoundError } from "../../utils/error-types.js";
import { User } from "../user/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BlackListToken } from "./black-list-token-model.js";
import { errorDetail, errorMessage } from "../../utils/error-message.js";

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
      throw new BadRequestError(errorMessage.invalidInput, {
        error: errorDetail.emailAlreadyRegistered,
      });
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
      throw new DataNotFoundError(errorMessage.dataNotFound, {
        error: errorDetail.emailUnregistered,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError(errorMessage.invalidInput, {
        error: errorDetail.passwordNotMatch,
      });
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
