import type { Request, Response, NextFunction } from "express";
import { formatResponse } from "../../../utils/response-format.js";
import {
  addRoomTypeService,
  getAllRoomTypeService,
  getRoomTypeByAIDService,
  updateRoomTypeService,
} from "./room-type-service.js";
import { BadRequestError } from "../../../utils/error-types.js";
import { errorDetail, errorMessage } from "../../../utils/error-message.js";

export async function addRoomTypeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accomodationId, name, cost, detail, pictureUrl } = req.body;
    const newRoom = await addRoomTypeService(
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

export async function getRoomTypeByAIDController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const aid = req.params.aid;
    if (aid === undefined) {
      throw new BadRequestError(errorMessage.invalidInput, {
        error: errorDetail.paramEmpty,
      });
    }
    const aidInNumber = Number(aid);
    const rooms = await getRoomTypeByAIDService(aidInNumber);
    formatResponse(res, 200, rooms);
  } catch (error) {
    next(error);
  }
}

export async function getAllRoomTypeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const rooms = await getAllRoomTypeService();
    formatResponse(res, 200, rooms);
  } catch (error) {
    next(error);
  }
}

export async function updateRoomTypeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { RTID, name, cost, detail, pictureUrl } = req.body;
    const updatedRoom = await updateRoomTypeService(
      RTID,
      name,
      cost,
      detail,
      pictureUrl
    );
    formatResponse(res, 201, updatedRoom);
  } catch (error) {
    next(error);
  }
}
