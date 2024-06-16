import type { Request, Response, NextFunction } from "express";
import { paymentConfig } from "../../config/server-config.js";

import Stripe from "stripe";
import {
  addTrxAccomService,
  getTrxAccomByUIDService,
} from "./trx-accom-service.js";
import { formatResponse } from "../../utils/response-format.js";
import { getRoomTypeByRTIDService } from "../accomodation/room-type/room-type-service.js";
import { getAccomById } from "../accomodation/accommodation/accom-service.js";
const stripe = new Stripe(paymentConfig.SECRET_KEY, {
  appInfo: { name: "stripe-samples/accept-a-payment" },
  typescript: true,
});

export async function addTrxAccomController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const UID = req.userId;
    const { AID, RTID, checkInDate, checkOutDate } = req.body;
    const accom = await getAccomById(AID);
    const roomType = await getRoomTypeByRTIDService(RTID);
    const payment = await addTrxAccomService(
      UID,
      AID,
      accom.name,
      roomType.name,
      roomType.cost,
      checkInDate,
      checkOutDate
    );
    formatResponse(res, 201, payment);
  } catch (error) {
    next(error);
  }
}

export async function transactionSuccessController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send("payment success");
}

export async function getTrxAccomByUIDController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const UID = req.userId;
    const trxs = await getTrxAccomByUIDService(UID);
    formatResponse(res, 200, trxs);
  } catch (error) {
    next(error);
  }
}
