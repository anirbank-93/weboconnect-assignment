import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import db from "../../models";

// Utils
import { omit } from "lodash";

// Services
// import { findUser } from "../services/user.service";

export async function createUserHandler(req: Request, res: Response) {
  const query = `
      INSERT INTO social_one.users (id, firstName, lastName, email, password, profile_pic)
      VALUES (:id, :firstName, :lastName, :email, :password, :profile_pic);
    `;

  try {
    let obj = {
      id: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      profile_pic: req.body.profile_pic
    }

    await db.sequelize.query(query, {
      replacements: obj,
      type: db.sequelize.QueryTypes.INSERT, // Specify the type of query
    });

    res.status(201).json({
      status: true,
      message: "Registration successfully.",
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: "Failed to create user. Please try again.",
      error: error,
    });
  }
}

export async function getUserHandler(req: Request, res: Response) {
  let userId = req.params.id;

  try {
    const user = await db.sequelize.query(
      `SELECT * FROM social_one.users WHERE id = :id;`,
      { replacements: { id: userId }, type: db.sequelize.QueryTypes.SELECT }
    );

    return res.status(200).json({
      status: true,
      message: "User data fetch successful.",
      data: omit(user["0"], "password"),
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: "Server error. Please try again.",
      error: error.message,
    });
  }
}
