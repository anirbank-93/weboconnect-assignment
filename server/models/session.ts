"use strict";
import { Model } from "sequelize";

export interface SessionAttributes {
  id: number;
  user_id: string;
  valid: boolean;
  userAgent: string;
  ip: string;
  createdAt?: Date;
  updatedAt?: Date;
}

module.exports = (
  sequelize: any,
  DataTypes: { STRING: any; INTEGER: any; BOOLEAN: any; DATE: any }
) => {
  class Session extends Model<SessionAttributes> implements SessionAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    user_id!: string;
    valid!: boolean;
    userAgent!: string;
    ip!: string;
    createdAt!: Date;
    updatedAt!: Date;
    static associate(models: any) {
      // define association here
      // Session.belongsTo(models.User, {
      //   as: "sessions_of_user",
      //   foreignKey: "user_id",
      // });
    }
  }
  Session.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      userAgent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "Session",
    }
  );
  return Session;
};
