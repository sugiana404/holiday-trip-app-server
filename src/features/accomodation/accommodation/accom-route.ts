import { Router } from "express";
import {
  addAccomController,
  getAccomController,
  getAccomDetailController,
  updateAccomController,
} from "./accom-controller.js";
import { jwtValidator } from "../../../middleware/jwt-middleware.js";

const accomodationRouter = Router();

accomodationRouter.get("/get-all", jwtValidator, getAccomController);
accomodationRouter.post("/add-accommodation", jwtValidator, addAccomController);
accomodationRouter.get(
  "/get-detail/:id",
  jwtValidator,
  getAccomDetailController
);
accomodationRouter.put(
  "/update-accommodation/",
  jwtValidator,
  updateAccomController
);

export { accomodationRouter };
