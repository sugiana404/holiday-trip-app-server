import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../../config/db-config.js";
import { Accomodation } from "../accommodation/accom-model.js";

interface RoomTypeAttributes {
  id: number;
  accomodationId: number;
  name: string;
  cost: number;
  detail: string;
  pictureUrl: string;
}

interface RoomTypeCreationAttributes
  extends Optional<RoomTypeAttributes, "id"> {}

class RoomType
  extends Model<RoomTypeAttributes, RoomTypeCreationAttributes>
  implements RoomTypeAttributes
{
  public id!: number;
  public accomodationId!: number;
  public name!: string;
  public cost!: number;
  public detail!: string;
  public pictureUrl!: string;
}

RoomType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    accomodationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pictureUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "RoomType",
    freezeTableName: true,
  }
);

RoomType.belongsTo(Accomodation, { foreignKey: "accomodationId" });

export { RoomType };
