import type { Request, Response, NextFunction } from "express";
import {
  addAccomRevService,
  getAccomRevByAIDService,
  updateAccomRevService,
} from "./accom-rev-service.js";
import { formatResponse } from "../../../utils/response-format.js";
import { BadRequestError } from "../../../utils/error-types.js";
import { updateAccomRatingService } from "../accommodation/accom-service.js";
import { errorDetail, errorMessage } from "../../../utils/error-message.js";
export async function addAccomRevController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accomodationId, userId, userName, rating, review } = req.body;
    const newReview = await addAccomRevService(
      accomodationId,
      userId,
      userName,
      rating,
      review
    );
    const updateAccomodationRating = await updateAccomRatingService(
      accomodationId,
      rating
    );

    formatResponse(res, 201, {
      newReview: newReview,
      updatedAccomodationRating: updateAccomodationRating,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAccomRevByAIDController(
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
    const reviews = await getAccomRevByAIDService(aidInNumber);
    formatResponse(res, 200, reviews);
  } catch (error) {
    next(error);
  }
}

export async function updateAccomRevController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const uid = req.userId;
    const { arId, rating, review } = req.body;
    const updatedReview = await updateAccomRevService(
      uid,
      arId,
      rating,
      review
    );
    formatResponse(res, 201, updatedReview);
  } catch (error) {
    next(error);
  }
}
