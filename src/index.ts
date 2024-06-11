import Express from "express";
import { serverConfig } from "./config/server-config.js";
import { sequelize } from "./config/db-config.js";
import { authRouter } from "./features/auth/auth-route.js";

async function startDatabaseConnection(): Promise<void> {
  try {
    console.log(`Connecting to : ${serverConfig.DB_NAME}`);
    await sequelize.sync({ force: true, logging: false });
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

function startServer(): void {
  server.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
  });
}

startServer();
