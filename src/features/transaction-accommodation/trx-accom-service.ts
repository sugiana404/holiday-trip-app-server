import { paymentConfig } from "../../config/server-config.js";
import { currencyToUsd } from "../../utils/currency.js";
import { paymentStatus, TransactionAccommodation } from "./trx-accom-model.js";
import Stripe from "stripe";

const stripe = new Stripe(paymentConfig.SECRET_KEY, {
  appInfo: { name: "holiday-trip-app/payment" },
  typescript: true,
});

export async function addTrxAccomService(
  UID: number,
  AID: number,
  accomName: string,
  roomType: string,
  totalCost: number,
  checkInDate: Date,
  checkOutDate: Date
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "idr",
            product_data: {
              name: `${accomName} - ${roomType}`,
            },
            unit_amount: totalCost * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/transaction-accommodation/success",
      cancel_url: "http://localhost:3000/transaction-accommodation/failed",
    });

    const response = {
      id: session.id,
      affter_expiration: session.after_expiration,
      amount_subtotal: session.amount_subtotal,
      amount_total: session.amount_total,
      payment_status: session.payment_status,
      url: session.url,
    };

    console.log(response);

    const trx = await TransactionAccommodation.create({
      uid: UID,
      aid: AID,
      accommodationName: accomName,
      roomType: roomType,
      totalCost: totalCost,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      paymentStatus: paymentStatus.UNPAID,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getTrxAccomByUIDService(UID: number) {
  try {
    const trxs = await TransactionAccommodation.findAll({
      where: { uid: UID },
    });
    return trxs;
  } catch (error) {
    throw error;
  }
}
