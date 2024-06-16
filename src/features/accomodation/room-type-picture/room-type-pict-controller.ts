import type { Request, Response, NextFunction } from "express";
import {
  addRoomTypesPictService,
  getAllRoomTypesPictService,
  getRoomTypePictByRTIDService,
} from "./room-type-pict-service.js";
import { formatResponse } from "../../../utils/response-format.js";
import { BadRequestError } from "../../../utils/error-types.js";

export async function addRoomTypesPictController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { roomTypeId, pictureUrlArray } = req.body;
    const newPictures = await addRoomTypesPictService(
      roomTypeId,
      pictureUrlArray
    );
    formatResponse(res, 201, newPictures);
  } catch (error) {
    next(error);
  }
}

export async function getAllRoomTypesPictController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const roomTypesPictures = await getAllRoomTypesPictService();
    formatResponse(res, 200, roomTypesPictures);
  } catch (error) {
    next(error);
  }
}

export async function getRoomTypePictByRTIDController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const rtid = req.params.rtid;
    if (rtid === undefined) {
      throw new BadRequestError("RTID params is empty");
    }
    const rtidInNumber = Number(rtid);
    const pictures = await getRoomTypePictByRTIDService(rtidInNumber);
    formatResponse(res, 200, pictures);
  } catch (error) {
    next(error);
  }
}
