import { Router } from "express";
import {
  addRoomTypesPictureController,
  getAllRoomTypesPictureController,
  getRTPbyRTIDController,
} from "./room-type-pictures-controller.js";

const roomTypePictureRoutes = Router();

roomTypePictureRoutes.post("/add-pictures", addRoomTypesPictureController);
roomTypePictureRoutes.get("/get-all", getAllRoomTypesPictureController);
roomTypePictureRoutes.get("/get-by-rtid/:rtid", getRTPbyRTIDController);

export { roomTypePictureRoutes };
