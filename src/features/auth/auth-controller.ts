import type { Request, Response, NextFunction } from "express";
import { loginService } from "./auth-service.js";
export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, name, birthDay, phoneNumber } = req.body;
    const newUser = await loginService(
      email,
      password,
      name,
      birthDay,
      phoneNumber
    );
    res.send(`${JSON.stringify(newUser)}`);
  } catch (error) {
    res.send("error");
  }
}
