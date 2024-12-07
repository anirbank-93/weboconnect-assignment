import { Request, Response } from "express";
import db from "../../models";

export async function getPosts(req: Request, res: Response) {
  try {
    let result = await db.sequelize.query(
      `SELECT "id", "title", "message", "user_id", "tags", "selectedFile", "likeCount", "firstName", "lastName", "profile_pic" "createdAt", "updatedAt" FROM social_one.posts As posts LEFT JOIN social_one.users AS users ON "posts.user_id"="user.id"`,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    res.status(200).json({
        status: true,
        message: "Posts get successfully.",
        data: result
      });
  } catch (error) {
    //
  }
}

export async function createPost(req: Request, res: Response) {
  res.status(201).json({
    status: true,
    message: "Post created successfully.",
  });
}
