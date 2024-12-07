"use strict";
import { Model, UUIDV4 } from "sequelize";

export interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

module.exports = (
  sequelize: any,
  DataTypes: { STRING: any; INTEGER: any; UUID: any }
) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    static associate(models: any) {
      // define association here
      User.hasMany(models.Post, {
        as: "posts",
        foreignKey: "user_id"
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        // autoIncrement: true,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
