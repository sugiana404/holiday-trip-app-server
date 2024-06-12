import type { Request, Response, NextFunction } from "express";
import {
  addAccomodationService,
  getAccomodationDetailService,
  getAccomodationService,
} from "./accomodation-service.js";
import { formatResponse } from "../../utils/response-format.js";
import { BadRequestError } from "../../utils/error-types.js";
import { getRoomTypeByAccomodationIdService } from "./room-type-service.js";

export async function getAccomodationController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accomodations = await getAccomodationService();
    formatResponse(res, 200, accomodations);
  } catch (error) {
    next(error);
  }
}

export async function addAccomodationController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, location, pictureUrl, detail, rating } = req.body;
    const newAccomodation = await addAccomodationService(
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

export async function getAccomodationDetailController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    if (id === undefined) {
      throw new BadRequestError("Id params is empty");
    }
    const idNumber = Number(id);
    const accomodation = await getAccomodationDetailService(idNumber);
    const roomTypes = await getRoomTypeByAccomodationIdService(idNumber);
    formatResponse(res, 200, {
      accomodation: accomodation,
      roomTypes: roomTypes,
    });
  } catch (error) {
    next(error);
  }
}
