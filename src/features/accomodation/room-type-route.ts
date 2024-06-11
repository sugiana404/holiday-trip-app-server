import { Router } from "express";
import { createRoomTypeController } from "./room-type-controller.js";

const roomTypeRouter = Router();

// roomTypeRouter.get("/getAll");
roomTypeRouter.post("/createRoom", createRoomTypeController);

export { roomTypeRouter };
