import { Request, Response } from "express";

// Utils
import { omit } from "lodash";

// Services
import { createUser, findUser } from "../services/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);

    if (user) {
      return res.status(201).json({
        status: true,
        message: "User created successfully.",
        data: omit(user.toJSON(), "password"),
      });
    } else {
      return res.status(400).json({ status: false, message: "Input error" });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: "Failed to create user. Please try again.",
      error: error.message,
    });
  }
}

export async function getUserHandler(req: Request, res: Response) {
  try {
    const user = await findUser({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Invalid user id. User not found.",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: "User data fetch successful.",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: "Server error. Please try again.",
      error: error.message,
    });
  }
}
