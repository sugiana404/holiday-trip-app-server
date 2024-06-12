import { AccomodationReview } from "./accomodation-review-model.js";

export async function createAccomodationReviewService(
  accomodationId: number,
  userId: number,
  userName: string,
  rating: number,
  review: string
): Promise<AccomodationReview> {
  try {
    const newReview = await AccomodationReview.create({
      accomodationId: accomodationId,
      userId: userId,
      userName: userName,
      rating: rating,
      review: review,
    });
    return newReview;
  } catch (error) {
    throw error;
  }
}

export async function getARByAIDService(AID: number) {
  try {
    const reviews = await AccomodationReview.findAll({
      where: { accomodationId: AID },
    });
    return reviews;
  } catch (error) {
    throw error;
  }
}
