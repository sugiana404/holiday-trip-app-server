import type { Request, Response, NextFunction } from "express";
import {
  addAccomService,
  getAccomById,
  getAccomService,
  updateAccomService,
} from "./accom-service.js";
import { formatResponse } from "../../../utils/response-format.js";
import { BadRequestError } from "../../../utils/error-types.js";
import { getRoomTypeByAIDService } from "../room-type/room-type-service.js";
import { getAccomRevByAIDService } from "../accommodation-review/accom-rev-service.js";
import { errorDetail, errorMessage } from "../../../utils/error-message.js";

export async function getAccomController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accomodations = await getAccomService();
    formatResponse(res, 200, accomodations);
  } catch (error) {
    next(error);
  }
}

export async function addAccomController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, location, pictureUrl, detail } = req.body;
    const newAccomodation = await addAccomService(
      name,
      location,
      pictureUrl,
      detail
    );
    formatResponse(res, 201, newAccomodation);
  } catch (error) {
    next(error);
  }
}

export async function getAccomDetailController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    if (id === undefined) {
      throw new BadRequestError(errorMessage.invalidInput, {
        error: errorDetail.paramEmpty,
      });
    }
    const idNumber = Number(id);
    const accomodation = await getAccomById(idNumber);
    const roomTypes = await getRoomTypeByAIDService(idNumber);
    const review = await getAccomRevByAIDService(idNumber);
    formatResponse(res, 200, {
      accomodation: accomodation,
      roomTypes: roomTypes,
      review: review,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAccomController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { AID, name, location, pictureUrl, detail } = req.body;
    const updatedAccommodation = await updateAccomService(
      AID,
      name,
      location,
      pictureUrl,
      detail
    );
    formatResponse(res, 200, updatedAccommodation);
  } catch (error) {
    next(error);
  }
}
