import type { Response } from "express";

export function formatError(
  errorCode: string,
  message: string,
  details?: Record<string, any>
) {
  return {
    error: errorCode,
    message: message,
    details: details,
  };
}
