import { Request, Response } from "express";
import db from "../../models";

export async function getPosts(req: Request, res: Response) {
  try {
    // "id", "title", "message", "user_id", "tags", "pictures", "likeCount", "createdAt", "updatedAt", "firstName", "lastName", "profile_pic"
    // As posts LEFT JOIN social_one.users AS users ON "posts.user_id"="user.id"
    let result = await db.sequelize.query(
      `SELECT * FROM social_one.posts`,
      {type: db.sequelize.QueryTypes.SELECT, }
    );
    console.log(result);
    
    res.status(200).json({
      status: true,
      message: "Posts get successfully.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}

export async function createPost(req: Request, res: Response) {
  const query = `
      INSERT INTO social_one.posts (title, message, user_id, tags, pictures)
      VALUES (:title, :message, :user_id, :tags, :pictures);
    `;

  try {
    console.log(JSON.stringify(req.body));

    const { title, message, creator } = req.body || {};
    if (!title || !message || !creator) {
      console.log(title);
      console.log(message);
      console.log(creator)
      return res.status(400).json({
        status: false,
        message: "Invalid request body. Missing required fields.",
      });
    }

    await db.sequelize.query(query, {
      replacements: {
        title: req.body.title,
        message: req.body.message,
        user_id: req.body.creator, // Fixed: Changed :message to :user_id
        tags: req.body.tags,
        pictures: req.body.pictures,
      },
      type: db.sequelize.QueryTypes.INSERT, // Specify the type of query
    });

    res.status(201).json({
      status: true,
      message: "Post created successfully.",
    });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}
