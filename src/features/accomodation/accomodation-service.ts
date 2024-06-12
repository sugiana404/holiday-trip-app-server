import { BadRequestError, DataNotFoundError } from "../../utils/error-types.js";
import { Accomodation } from "./accomodation-model.js";

export async function getAccomodationService(): Promise<Accomodation[]> {
  try {
    const accomodations = await Accomodation.findAll();
    return accomodations;
  } catch (error) {
    throw error;
  }
}

export async function addAccomodationService(
  name: string,
  location: string,
  pictureUrl: string,
  detail: string
): Promise<Accomodation> {
  try {
    const newAccomodation = await Accomodation.create({
      name: name,
      location: location,
      pictureUrl: pictureUrl,
      detail: detail,
      rating: 0,
      totalRating: 0,
      totalReviewer: 0,
    });
    return newAccomodation;
  } catch (error) {
    throw error;
  }
}

export async function getAccomodationDetailService(
  id: number
): Promise<Accomodation> {
  try {
    const accomodationData = await Accomodation.findByPk(id);
    if (accomodationData === null) {
      throw new DataNotFoundError("Data not found");
    }
    return accomodationData;
  } catch (error) {
    throw error;
  }
}

export async function updateAccomodationRatingService(
  accomodationId: number,
  rating: number
): Promise<Record<string, any>> {
  try {
    const accomodation = await Accomodation.findByPk(accomodationId);
    if (
      accomodation === undefined ||
      accomodation?.rating === undefined ||
      accomodation?.totalRating === undefined ||
      accomodation.totalReviewer === undefined
    ) {
      throw new DataNotFoundError("Accomodation not exist");
    }

    const newTotalRating = accomodation?.rating + rating;
    const newTotalReviewer = accomodation.totalReviewer + 1;
    const newRating = newTotalRating / newTotalReviewer;

    accomodation.set({
      rating: newRating,
      totalRating: newTotalRating,
      totalReviewer: newTotalReviewer,
    });

    await accomodation.save();
    const updatedData = {
      rating: newRating,
      totalRating: newTotalRating,
      totalReviewer: newTotalReviewer,
    };

    return updatedData;
  } catch (error) {
    throw error;
  }
}
