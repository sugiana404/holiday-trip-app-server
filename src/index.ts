import Express from "express";
import { serverConfig } from "./config/server-config.js";

const server = Express();
const PORT = serverConfig.PORT || 3001;

server.use(Express.json());

function startServer(): void {
  server.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
  });
}

startServer();
