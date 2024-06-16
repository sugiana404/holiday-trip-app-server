import { Router } from "express";
import {
  getAccomRevByAIDController,
  updateAccomRevController,
} from "./accom-rev-controller.js";
import { jwtValidator } from "../../../middleware/jwt-middleware.js";
import { addAccomController } from "../accommodation/accom-controller.js";

const accomodationReviewRouter = Router();

accomodationReviewRouter.post(
  "/create-review",
  jwtValidator,
  addAccomController
);

accomodationReviewRouter.get(
  "/get-by-aid/:aid",
  jwtValidator,
  getAccomRevByAIDController
);

accomodationReviewRouter.put(
  "/update-review",
  jwtValidator,
  updateAccomRevController
);

export { accomodationReviewRouter };
