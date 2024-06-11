import type { Response, Request, NextFunction } from "express";
import { ResourceNotFoundError } from "../utils/error-types.js";

export function pageNotFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = new ResourceNotFoundError("Page not found");
  res.status(404).json({ error: error.message });
}
