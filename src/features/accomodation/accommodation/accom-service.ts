import { errorDetail, errorMessage } from "../../../utils/error-message.js";
import { DataNotFoundError } from "../../../utils/error-types.js";
import { Accomodation } from "./accom-model.js";

export async function getAccomService(): Promise<Accomodation[]> {
  try {
    const accomodations = await Accomodation.findAll();
    return accomodations;
  } catch (error) {
    throw error;
  }
}

export async function addAccomService(
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

export async function getAccomById(id: number): Promise<Accomodation> {
  try {
    const accomodation = await Accomodation.findByPk(id);
    if (accomodation === null) {
      throw new DataNotFoundError(errorMessage.dataNotFound, {
        error: errorDetail.accomNotFound,
      });
    }
    return accomodation;
  } catch (error) {
    throw error;
  }
}

export async function updateAccomService(
  AID: number,
  newName: string | undefined,
  newLocation: string | undefined,
  newPictureUrl: string | undefined,
  newDetail: string | undefined
) {
  try {
    const accomodation = await Accomodation.findByPk(AID);
    if (!accomodation) {
      throw new DataNotFoundError(errorMessage.dataNotFound, {
        error: errorDetail.accomNotFound,
      });
    }
    const newAccomodationData = await accomodation?.update({
      name: newName,
      location: newLocation,
      pictureUrl: newPictureUrl,
      detail: newDetail,
    });
    return newAccomodationData;
  } catch (error) {
    throw error;
  }
}

export async function updateAccomRatingService(
  accomodationId: number,
  rating: number
): Promise<Record<string, any>> {
  try {
    const accomodation = await Accomodation.findByPk(accomodationId);
    if (!accomodation) {
      throw new DataNotFoundError(errorMessage.dataNotFound, {
        error: errorDetail.accomNotFound,
      });
    }

    const newTotalRating = accomodation.totalRating + rating;
    const newTotalReviewer = accomodation.totalReviewer + 1;
    const newRating = Number((newTotalRating / newTotalReviewer).toFixed(2));

    console.log(newRating);
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
