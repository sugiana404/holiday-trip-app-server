import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../../config/db-config.js";
import { User } from "../user/user-model.js";
import { Accomodation } from "../accomodation/accommodation/accom-model.js";

export enum paymentStatus {
  PAID = "Paid",
  UNPAID = "Unpaid",
  CANCELED = "Canceled",
}

interface TransactionAccommodationAttributes {
  id: number;
  uid: number;
  aid: number;
  accommodationName: string;
  roomType: string;
  totalCost: number;
  checkInDate: Date;
  checkOutDate: Date;
  paymentStatus: paymentStatus;
}

interface TransactionAccommodationCreationAttributes
  extends Optional<TransactionAccommodationAttributes, "id"> {}

class TransactionAccommodation
  extends Model<
    TransactionAccommodationAttributes,
    TransactionAccommodationCreationAttributes
  >
  implements TransactionAccommodationAttributes
{
  public id!: number;
  public uid!: number;
  public aid!: number;
  public accommodationName!: string;
  public roomType!: string;
  public totalCost!: number;
  public checkInDate!: Date;
  public checkOutDate!: Date;
  public paymentStatus!: paymentStatus;
}

TransactionAccommodation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    aid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accommodationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checkInDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM(
        paymentStatus.PAID,
        paymentStatus.UNPAID,
        paymentStatus.CANCELED
      ),
      allowNull: false,
      defaultValue: paymentStatus.UNPAID,
    },
  },
  { sequelize, modelName: "TransactionAccomodation", freezeTableName: true }
);
TransactionAccommodation.belongsTo(User, { foreignKey: "uid" });
TransactionAccommodation.belongsTo(Accomodation, { foreignKey: "aid" });

export { TransactionAccommodation };
