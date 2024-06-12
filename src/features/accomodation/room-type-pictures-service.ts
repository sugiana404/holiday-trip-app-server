import { RoomTypePictures } from "./room-type-pictures-model.js";

export async function addRoomTypesPictureService(
  roomTypeId: number,
  pictureUrlArray: Array<string>
) {
  try {
    for (let i of pictureUrlArray) {
      await RoomTypePictures.create({
        roomTypeId: roomTypeId,
        pictureUrl: i,
      });
    }
    const addedPictures = {
      roomTypeId: roomTypeId,
      pictureUrlArray: pictureUrlArray,
    };
    return addedPictures;
  } catch (error) {
    throw error;
  }
}

export async function getAllRoomTypesPictureService() {
  try {
    const roomTypesPictures = await RoomTypePictures.findAll();
    return roomTypesPictures;
  } catch (error) {
    throw error;
  }
}

export async function getRTPByRTIDService(RTID: number) {
  try {
    const pictures = await RoomTypePictures.findAll({
      where: { roomTypeId: RTID },
    });
    return pictures;
  } catch (error) {
    throw error;
  }
}
