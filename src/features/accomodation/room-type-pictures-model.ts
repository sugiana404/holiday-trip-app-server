import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db-config.js";

interface RoomTypePicturesAttributes {
  id: number;
  roomTypeId: number;
  pictureUrl: string;
}

interface RoomTypePicturesCreationAttributes
  extends Optional<RoomTypePicturesAttributes, "id"> {}

class RoomTypePictures
  extends Model<RoomTypePicturesAttributes, RoomTypePicturesCreationAttributes>
  implements RoomTypePicturesAttributes
{
  public id!: number;
  public roomTypeId!: number;
  public pictureUrl!: string;
}

RoomTypePictures.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roomTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pictureUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "RoomTypePictures",
    freezeTableName: true,
  }
);

export { RoomTypePictures };
