import { Router } from "express";
import {
  addRoomTypeController,
  getAllRoomTypeController,
  getRoomTypeByAIDController,
  updateRoomTypeController,
} from "./room-type-controller.js";
import { jwtValidator } from "../../../middleware/jwt-middleware.js";

const roomTypeRouter = Router();

roomTypeRouter.post("/create-room", jwtValidator, addRoomTypeController);
roomTypeRouter.get("/get-all", jwtValidator, getAllRoomTypeController);
roomTypeRouter.get(
  "/get-by-aid/:aid",
  jwtValidator,
  getRoomTypeByAIDController
);
roomTypeRouter.put("/update-room-type", jwtValidator, updateRoomTypeController);

export { roomTypeRouter };
