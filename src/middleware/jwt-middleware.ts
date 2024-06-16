import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { BadRequestError, UnauthorizedError } from "../utils/error-types.js";
import { serverConfig } from "../config/server-config.js";
import { BlackListToken } from "../features/auth/black-list-token-model.js";
import { errorDetail, errorMessage } from "../utils/error-message.js";

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
      throw new UnauthorizedError(errorMessage.unauthorized, {
        error: errorDetail.tokenEmpty,
      });
    }

    const blackListedToken = await BlackListToken.findOne({
      where: { token: token },
    });

    if (blackListedToken) {
      throw new UnauthorizedError(errorMessage.unauthorized, {
        error: errorDetail.tokenBlackListed,
      });
    }

    jwt.verify(token, serverConfig.JWT_KEY, (err, decoded) => {
      if (err) {
        throw new UnauthorizedError(errorMessage.unauthorized, {
          error: errorDetail.tokenInvalid,
        });
      }
      req.userId = (decoded as MyJwtPayload)?.userId;
      next();
    });
  } catch (error) {
    next(error);
  }
}
