import { Router } from "express";
import {
  createRoomTypeController,
  getAllRoomTypeController,
} from "./room-type-controller.js";
import { jwtValidator } from "../../middleware/jwt-middleware.js";

const roomTypeRouter = Router();

roomTypeRouter.post("/createRoom", jwtValidator, createRoomTypeController);
roomTypeRouter.get("/get-all", getAllRoomTypeController);

export { roomTypeRouter };
