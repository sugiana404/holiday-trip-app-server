import type { Request, Response, NextFunction } from "express";
import {
  addRoomTypesPictureService,
  getAllRoomTypesPictureService,
  getRTPByRTIDService,
} from "./room-type-pictures-service.js";
import { formatResponse } from "../../utils/response-format.js";
import { BadRequestError } from "../../utils/error-types.js";

export async function addRoomTypesPictureController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { roomTypeId, pictureUrlArray } = req.body;
    const newPictures = await addRoomTypesPictureService(
      roomTypeId,
      pictureUrlArray
    );
    formatResponse(res, 201, newPictures);
  } catch (error) {
    next(error);
  }
}

export async function getAllRoomTypesPictureController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const roomTypesPictures = await getAllRoomTypesPictureService();
    formatResponse(res, 200, roomTypesPictures);
  } catch (error) {
    next(error);
  }
}

export async function getRTPbyRTIDController(
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
    const pictures = await getRTPByRTIDService(rtidInNumber);
    formatResponse(res, 200, pictures);
  } catch (error) {
    next(error);
  }
}
