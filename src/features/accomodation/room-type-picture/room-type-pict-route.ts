import { Router } from "express";
import {
  addRoomTypesPictController,
  getAllRoomTypesPictController,
  getRoomTypePictByRTIDController,
} from "./room-type-pict-controller.js";
import { jwtValidator } from "../../../middleware/jwt-middleware.js";

const roomTypePictureRoutes = Router();

roomTypePictureRoutes.post(
  "/add-pictures",
  jwtValidator,
  addRoomTypesPictController
);
roomTypePictureRoutes.get(
  "/get-all",
  jwtValidator,
  getAllRoomTypesPictController
);
roomTypePictureRoutes.get(
  "/get-by-rtid/:rtid",
  jwtValidator,
  getRoomTypePictByRTIDController
);

export { roomTypePictureRoutes };
