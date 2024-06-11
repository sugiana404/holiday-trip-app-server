import Express from "express";
import { serverConfig } from "./config/server-config.js";
import { sequelize } from "./config/db-config.js";
import { authRouter } from "./features/auth/auth-route.js";
import { errorMiddleware } from "./middleware/error-middleware.js";
import { pageNotFoundMiddleware } from "./middleware/page-not-found-middleware.js";
import { accomodationRouter } from "./features/accomodation/accomodation-route.js";
import { roomTypeRouter } from "./features/accomodation/room-type-route.js";

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

server.use("/accomodation", accomodationRouter);
server.use("/roomType", roomTypeRouter);

server.use(errorMiddleware);
server.use(pageNotFoundMiddleware);
function startServer(): void {
  server.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
  });
}

startServer();
