import { Router } from "express";
import {
  addTrxAccomController,
  getTrxAccomByUIDController,
  transactionSuccessController,
} from "./trx-accom-controller.js";
import { jwtValidator } from "../../middleware/jwt-middleware.js";

const transactionAccomodationRouter = Router();

transactionAccomodationRouter.post(
  "/add-transaction",
  jwtValidator,
  addTrxAccomController
);
transactionAccomodationRouter.get(
  "/get-user-transaction-accommodation",
  jwtValidator,
  getTrxAccomByUIDController
);

transactionAccomodationRouter.get("/success", transactionSuccessController);

export { transactionAccomodationRouter };
