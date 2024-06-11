import type { Request, Response, NextFunction } from "express";
import { formatResponse } from "../../utils/response-format.js";
import { createRoomService } from "./room-type-service.js";

export async function createRoomTypeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accomodationId, name, cost, detail, pictureUrl } = req.body;
    const newRoom = await createRoomService(
      accomodationId,
      name,
      cost,
      detail,
      pictureUrl
    );
    formatResponse(res, 201, newRoom);
  } catch (error) {
    next(error);
  }
}
