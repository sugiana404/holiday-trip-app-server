import { errorDetail, errorMessage } from "../../../utils/error-message.js";
import { DataNotFoundError } from "../../../utils/error-types.js";
import { RoomType } from "./room-type-model.js";

export async function addRoomTypeService(
  AID: number,
  name: string,
  cost: number,
  detail: string,
  pictureUrl: string
): Promise<RoomType> {
  try {
    const newRoom = RoomType.create({
      accomodationId: AID,
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

export async function getRoomTypeByAIDService(
  AID: number
): Promise<RoomType[]> {
  try {
    const rooms = await RoomType.findAll({
      where: { accomodationId: AID },
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

export async function getRoomTypeByRTIDService(RTID: number) {
  try {
    const roomType = await RoomType.findByPk(RTID);
    if (!roomType) {
      throw new DataNotFoundError(errorMessage.dataNotFound, {
        error: errorDetail.roomTypeNotFound,
      });
    }
    return roomType;
  } catch (error) {
    throw error;
  }
}

export async function updateRoomTypeService(
  RTID: number,
  newName: string | undefined,
  newCost: number | undefined,
  newDetail: string | undefined,
  newPictureUrl: string | undefined
) {
  try {
    const room = await RoomType.findByPk(RTID);
    if (!room) {
      throw new DataNotFoundError(errorMessage.dataNotFound, {
        error: errorDetail.roomTypeNotFound,
      });
    }
    const updatedRoom = await room.update({
      name: newName,
      cost: newCost,
      detail: newDetail,
      pictureUrl: newPictureUrl,
    });
    return updatedRoom;
  } catch (error) {
    throw error;
  }
}
