import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db-config.js";
import { Accomodation } from "./accomodation-model.js";
import { User } from "../user/user-model.js";

interface AccomodationReviewAttributes {
  id: number;
  accomodationId: number;
  userId: number;
  userName: string;
  rating: number;
  review: string;
}

interface AccomodationReviewCreationAttributes
  extends Optional<AccomodationReviewAttributes, "id"> {}

class AccomodationReview
  extends Model<
    AccomodationReviewAttributes,
    AccomodationReviewCreationAttributes
  >
  implements AccomodationReviewAttributes
{
  public id!: number;
  public accomodationId!: number;
  public userId!: number;
  public userName!: string;
  public rating!: number;
  public review!: string;
}

AccomodationReview.init(
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AccomodationReview",
    freezeTableName: true,
  }
);
AccomodationReview.belongsTo(Accomodation, { foreignKey: "accomodationId" });
AccomodationReview.belongsTo(User, { foreignKey: "userId" });

export { AccomodationReview };
