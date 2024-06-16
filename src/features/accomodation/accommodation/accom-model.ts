import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../../config/db-config.js";

interface AccomodationAttributes {
  id: number;
  name: string;
  location: string;
  pictureUrl: string;
  detail: string;
  rating: number;
  totalRating: number;
  totalReviewer: number;
}

interface AccomodationCretionAttributes
  extends Optional<AccomodationAttributes, "id"> {}

class Accomodation
  extends Model<AccomodationAttributes, AccomodationCretionAttributes>
  implements AccomodationAttributes
{
  public id!: number;
  public name!: string;
  public location!: string;
  public pictureUrl!: string;
  public detail!: string;
  public rating!: number;
  public totalRating!: number;
  public totalReviewer!: number;
}

Accomodation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pictureUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    totalRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalReviewer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Accomodation",
    freezeTableName: true,
  }
);

export { Accomodation };
