import Express from "express";
import { serverConfig } from "./config/server-config.js";
import { sequelize } from "./config/db-config.js";

import { authRouter } from "./features/auth/auth-route.js";
import { accomodationRouter } from "./features/accomodation/accommodation/accom-route.js";
import { roomTypeRouter } from "./features/accomodation/room-type/room-type-route.js";
import { accomodationReviewRouter } from "./features/accomodation/accommodation-review/accom-rev-route.js";
import { roomTypePictureRoutes } from "./features/accomodation/room-type-picture/room-type-pict-route.js";
import { transactionAccomodationRouter } from "./features/transaction-accommodation/trx-accom-route.js";

import { pageNotFoundMiddleware } from "./middleware/page-not-found-middleware.js";
import { errorMiddleware } from "./middleware/error-middleware.js";

async function startDatabaseConnection(): Promise<void> {
  try {
    console.log(`Connecting to : ${serverConfig.DB_NAME}`);
    await sequelize.sync({ force: false, logging: false });
    console.log(`Connected.\n`);
  } catch (error) {
    console.error(`Unable to connect to ${serverConfig.DB_NAME}`, error);
  }
}

await startDatabaseConnection();

const server = Express();
const PORT = serverConfig.PORT || 3001;

server.use(Express.json());
server.use("/auth", authRouter);

// Accommodation feature
server.use("/accommodation", accomodationRouter);
server.use("/room-type", roomTypeRouter);
server.use("/accommodation-review", accomodationReviewRouter);
server.use("/room-type-picture", roomTypePictureRoutes);

// Transaction Accommodation Feature
server.use("/transaction-accommodation", transactionAccomodationRouter);

// error handling middleware
server.use(errorMiddleware);
server.use(pageNotFoundMiddleware);

function startServer(): void {
  server.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
  });
}

startServer();
