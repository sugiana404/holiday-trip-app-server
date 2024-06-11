import type { Request, Response, NextFunction } from "express";

import { formatResponse } from "../../utils/response-format.js";
import { loginService, registerService } from "./auth-service.js";
import Joi from "joi";
import { BadRequestError } from "../../utils/error-types.js";

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
      name: Joi.string().required(),
      birthDay: Joi.date().required(),
      phoneNumber: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      throw new BadRequestError("Joi validation error", {
        error: error.details[0]?.message,
      });
    }

    const { email, password, name, birthDay, phoneNumber } = req.body;
    const newUser = await registerService(
      email,
      password,
      name,
      birthDay,
      phoneNumber
    );
    formatResponse(res, 201, newUser);
  } catch (error) {
    next(error);
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      throw new BadRequestError("Joi validation error", {
        error: error.details[0]?.message,
      });
    }

    const { email, password } = req.body;
    const token = await loginService(email, password);
    formatResponse(res, 200, { token: `Bearer ${token}` });
  } catch (error) {
    next(error);
  }
}
