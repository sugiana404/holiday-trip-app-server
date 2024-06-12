import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db-config.js";

interface BlackListTokenAttributes {
  id: number;
  token: string;
}

interface BlackListTokenCreationAttributes
  extends Optional<BlackListTokenAttributes, "id"> {}

class BlackListToken
  extends Model<BlackListTokenAttributes, BlackListTokenCreationAttributes>
  implements BlackListTokenAttributes
{
  public id!: number;
  public token!: string;
}

BlackListToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "BlackListToken",
    freezeTableName: true,
  }
);

export { BlackListToken };
