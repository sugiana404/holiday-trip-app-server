import { RoomType } from "./room-type-model.js";

export async function createRoomService(
  accomodationId: number,
  name: string,
  cost: number,
  detail: string,
  pictureUrl: string
): Promise<RoomType> {
  try {
    const newRoom = RoomType.create({
      accomodationId: accomodationId,
      name: name,
      cost: cost,
      detail: detail,
      pictureUrl: pictureUrl,
    });
    return newRoom;
  } catch (error) {
    throw error;
  }
}

export async function getRoomTypeByAccomodationIdService(
  accomodationId: number
): Promise<RoomType[]> {
  try {
    const rooms = await RoomType.findAll({
      where: { accomodationId: accomodationId },
      attributes: ["id", "name", "cost", "pictureUrl"],
    });
    return rooms;
  } catch (error) {
    throw error;
  }
}

export async function getAllRoomTypeService() {
  try {
    const rooms = await RoomType.findAll();
    return rooms;
  } catch (error) {
    throw error;
  }
}
