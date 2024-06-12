import type { Request, Response, NextFunction } from "express";
import {
  createAccomodationReviewService,
  getARByAIDService,
} from "./accomodation-review-service.js";
import { formatResponse } from "../../utils/response-format.js";
import { updateAccomodationRatingService } from "./accomodation-service.js";
import { BadRequestError } from "../../utils/error-types.js";
export async function createAccomodationReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accomodationId, userId, userName, rating, review } = req.body;
    const newReview = await createAccomodationReviewService(
      accomodationId,
      userId,
      userName,
      rating,
      review
    );
    const updateAccomodationRating = await updateAccomodationRatingService(
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

export async function getARByAIDController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const aid = req.params.aid;
    if (aid === undefined) {
      throw new BadRequestError("aid is empty");
    }
    const aidInNumber = Number(aid);
    const reviews = await getARByAIDService(aidInNumber);
    formatResponse(res, 200, reviews);
  } catch (error) {
    next(error);
  }
}
