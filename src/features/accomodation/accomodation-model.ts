import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db-config.js";

interface AccomodationAttributes {
  id: number;
  name: string;
  location: string;
  pictureUrl: string;
  detail: string;
  rating: number;
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
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Accomodation",
    freezeTableName: true,
  }
);

export { Accomodation };
