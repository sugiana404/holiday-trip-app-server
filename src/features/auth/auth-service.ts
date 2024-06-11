import { User } from "../user/user-model.js";

export async function loginService(
  email: string,
  password: string,
  name: string,
  birthDay: Date,
  phoneNumber: string
): Promise<User> {
  try {
    const newUser = User.create({
      email: email,
      password: password,
      name: name,
      birthDay: birthDay,
      phoneNumber: phoneNumber,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
}
