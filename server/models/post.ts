"use strict";
import { Model } from "sequelize";

export interface PostAttributes {
  id: number;
  title: string;
  message: string;
  user_id: string;
  tags?: string;
  selectedFile?: string;
  likeCount?: number;
}

module.exports = (
  sequelize: any,
  DataTypes: { STRING: any; INTEGER: any; UUID: any }
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
    selectedFile!: string;
    likeCount!: number;
    static associate(models: any) {
      // define association here
      Post.belongsTo(models.User,{
        as:'created_by_user',
        foreignKey: 'user_id'
      });
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
        type: DataTypes.UUID,
        allowNull: false,
      },
      tags: {
        type: DataTypes.STRING,
      },
      selectedFile: {
        type: DataTypes.STRING,
      },
      likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
