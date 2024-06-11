import { Router } from "express";
import {
  addAccomodationController,
  getAccomodationController,
  getAccomodationDetailController,
} from "./accomodation-controller.js";
import { jwtValidator } from "../../middleware/jwt-middleware.js";

const accomodationRouter = Router();

accomodationRouter.get("/getAll", jwtValidator, getAccomodationController);
accomodationRouter.post(
  "/addAccomodation",
  jwtValidator,
  addAccomodationController
);
accomodationRouter.get("/getDetail/:id", getAccomodationDetailController);

export { accomodationRouter };
