import { Request, Response } from "express";
import db from "../../models";

export async function getPosts(req: Request, res: Response) {
  try {
    // "id", "title", "message", "user_id", "tags", "pictures", "likeCount", "createdAt", "updatedAt", "firstName", "lastName", "profile_pic"
    // As posts LEFT JOIN social_one.users AS users ON "posts.user_id"="user.id"
    let result = await db.sequelize.query(`SELECT * FROM social_one.posts`, {
      type: db.sequelize.QueryTypes.SELECT,
    });
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
      console.log(creator);
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

export async function updatePost(req: Request, res: Response) {
  let postId = req.params.postID;

  const query = `
    UPDATE social_one.posts
    SET user_id = :user_id,
        title = :title,
        message = :message,
        tags = :tags,
        pictures = :pictures
    WHERE id = :id;
  `;

  try {
    const { title, message, creator } = req.body || {};

    // Validate input
    if (!title || !message || !creator) {
      return res.status(400).json({
        status: false,
        message: "Invalid request body. Missing required fields.",
      });
    }

    // Execute the update query
    // const [result]: any
    const result = await db.sequelize.query(query, {
      replacements: {
        id: postId,
        user_id: req.body.creator,
        title: req.body.title,
        message: req.body.message,
        tags: req.body.tags,
        pictures: req.body.pictures,
      },
      type: db.sequelize.QueryTypes.UPDATE,
    });

    console.log(result);
    

    // // Check if any rows were updated
    // if (result.affectedRows === 0) {
    //   return res.status(404).json({
    //     status: false,
    //     message: "Post not found or no changes made.",
    //   });
    // }

    // Retrieve the updated post
    // const [updatedPost]: any
    const updatedPost = await db.sequelize.query(
      `SELECT * FROM social_one.posts WHERE id = :id;`,
      { replacements: { id: postId }, type: db.sequelize.QueryTypes.SELECT }
    );

    res.status(200).json({
      status: true,
      message: "Post updated successfully.",
      data: updatedPost,
    });
  } catch (error: any) {
    console.error("Error during SQL query execution:", error.message); // Logs the full error
    res.status(500).json({ status: false, message: error.message });
  }
}
