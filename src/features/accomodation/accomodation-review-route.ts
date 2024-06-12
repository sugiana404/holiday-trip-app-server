import { Router } from "express";
import {
  createAccomodationReviewController,
  getARByAIDController,
} from "./accomodation-review-controller.js";

const accomodationReviewRouter = Router();

accomodationReviewRouter.post(
  "/create_review",
  createAccomodationReviewController
);

accomodationReviewRouter.get("/get-by-aid/:aid", getARByAIDController);

export { accomodationReviewRouter };
