import type { Request, Response, NextFunction } from "express";

export async function formatResponse(
  res: Response,
  statusCode: number,
  data?: Record<string, any>
) {
  if (!data) {
    res.status(statusCode).json({ status: "success" });
  } else {
    res.status(statusCode).json({ status: "success", data: data });
  }
}
