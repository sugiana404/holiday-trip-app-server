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
