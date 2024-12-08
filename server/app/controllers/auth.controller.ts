import { Request, Response } from "express";

// Services
import { validatePassword } from "../services/user.service";
import { createSession, createAccessToken, updateSession } from "../services/session.service";

// Utils
import { sign } from "../utils/jwt.utils";

// Helpers
import config from "config";
import { get } from "lodash";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the email and password
  const user = await validatePassword(req.body);

  if (!user) {
    return res
      .status(401)
      .json({ status: false, message: "Invalid email or password" });
  }

  try {
    // create a session
    const session = await createSession(
      user._id,
      req.get("user-agent") || "",
      req.socket.remoteAddress || req.ip
    );

    // create access token
    const accessToken = createAccessToken({ user, session });

    // create refresh token
    const refreshToken = sign(session, {
      expiresIn: config.get("refreshTokenTtl"), // 1 minute
    });

    // send access & refresh token back
    return res.status(200).json({
      status: true,
      message: "Login successfull!",
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: "Failed to create session.",
      error: error.message,
    });
  }
}

export async function invalidateUserSessionHandler(req:Request, res:Response) {
  const sessionId = get(req, "user.session");

  await updateSession({ _id: sessionId }, { valid: false });

  return res.sendStatus(200);
}