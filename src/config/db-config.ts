import { Sequelize } from "sequelize";
import { serverConfig } from "./server-config.js";

const sequelize = new Sequelize(
  serverConfig.DB_NAME,
  serverConfig.DB_USER,
  serverConfig.DB_USER_PASSWORD,
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);

export { sequelize };
