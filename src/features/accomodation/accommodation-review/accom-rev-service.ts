import { errorDetail, errorMessage } from "../../../utils/error-message.js";
import {
  DataNotFoundError,
  UnauthorizedError,
} from "../../../utils/error-types.js";
import { AccomodationReview } from "./accom-rev-model.js";

export async function addAccomRevService(
  AID: number,
  UID: number,
  userName: string,
  rating: number,
  review: string
): Promise<AccomodationReview> {
  try {
    const newReview = await AccomodationReview.create({
      accomodationId: AID,
      userId: UID,
      userName: userName,
      rating: rating,
      review: review,
    });
    return newReview;
  } catch (error) {
    throw error;
  }
}

export async function getAccomRevByAIDService(AID: number) {
  try {
    const reviews = await AccomodationReview.findAll({
      where: { accomodationId: AID },
    });
    return reviews;
  } catch (error) {
    throw error;
  }
}

export async function updateAccomRevService(
  UID: number,
  ARID: number,
  newRating: number,
  newReview: string | undefined
) {
  try {
    const review = await AccomodationReview.findByPk(ARID);
    if (UID !== review?.userId) {
      throw new UnauthorizedError(errorMessage.unauthorized, {
        error: errorDetail.uidNotMatch,
      });
    }
    if (!review) {
      throw new DataNotFoundError(errorMessage.dataNotFound, {
        error: errorDetail.accomRevNotFound,
      });
    }
    const updatedReview = await review.update({
      rating: newRating,
      review: newReview,
    });
    return updatedReview;
  } catch (error) {
    throw error;
  }
}
