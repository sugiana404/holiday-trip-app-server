import Express from "express";
import { serverConfig } from "./config/server-config.js";
import { sequelize } from "./config/db-config.js";
import { authRouter } from "./features/auth/auth-route.js";
import { errorMiddleware } from "./middleware/error-middleware.js";
import { pageNotFoundMiddleware } from "./middleware/page-not-found-middleware.js";
import { accomodationRouter } from "./features/accomodation/accomodation-route.js";
import { roomTypeRouter } from "./features/accomodation/room-type-route.js";
import { accomodationReviewRouter } from "./features/accomodation/accomodation-review-route.js";
import { roomTypePictureRoutes } from "./features/accomodation/room-type-pictures-route.js";

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

// Accomodation feature
server.use("/accommodation", accomodationRouter);
server.use("/room-type", roomTypeRouter);
server.use("/accommodation-review", accomodationReviewRouter);
server.use("/room-type-picture", roomTypePictureRoutes);

// error handling middleware
server.use(errorMiddleware);
server.use(pageNotFoundMiddleware);

function startServer(): void {
  server.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
  });
}

startServer();
