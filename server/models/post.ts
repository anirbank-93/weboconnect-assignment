"use strict";
import { Model } from "sequelize";

export interface PostAttributes {
  id: number;
  title: string;
  message: string;
  user_id: string;
  tags?: string;
  pictures?: string;
  likeCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

module.exports = (
  sequelize: any,
  DataTypes: { STRING: any; INTEGER: any; UUID: any, DATE: any }
) => {
  class Post extends Model<PostAttributes> implements PostAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    title!: string;
    message!: string;
    user_id!: string;
    tags!: string;
    pictures!: string;
    likeCount!: number;
    createdAt!: Date;
    updatedAt!: Date;
    static associate(models: any) {
      // define association here
      // Post.belongsTo(models.User,{
      //   as:'created_by_user',
      //   foreignKey: 'user_id'
      // });
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tags: {
        type: DataTypes.STRING,
      },
      pictures: {
        type: DataTypes.STRING,
      },
      likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
