import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/error-types.js";
import { serverConfig } from "../config/server-config.js";

interface MyJwtPayload extends JwtPayload {
  userId: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      userId: number;
      email: string;
    }
  }
}

export async function jwtValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"] as string;
    const token = authHeader && authHeader.trim().split(" ")[1];

    if (!token) {
      throw new BadRequestError("Token not provided");
    }

    jwt.verify(token, serverConfig.JWT_KEY, (err, decoded) => {
      if (err) {
        throw new BadRequestError("Token expired or invalid", {
          resourceValue: token,
        });
      }
      req.userId = (decoded as MyJwtPayload)?.userId;
      next();
    });
  } catch (error) {
    next(error);
  }
}
