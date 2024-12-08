import { get, Omit } from "lodash";
import config from "config";
import { FlattenMaps, FilterQuery, UpdateQuery } from "mongoose";

import { UserDocument } from "../models/user.model";
import sessionModel, { SessionDocument } from "../models/session.model";

// Utils
import { sign, decode } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession(
  userId: UserDocument["_id"],
  userAgent: string,
  ip?: string
) {
  const session = await sessionModel.create({ user: userId, userAgent, ip });

  return session.toJSON();
}

export function createAccessToken({
  user,
  session,
}: {
  user:
    | Omit<UserDocument, "password">
    | Pick<FlattenMaps<any>, string | number | symbol>;
  session: Omit<SessionDocument, "password">;
}) {
  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 60 minutes
  );

  return accessToken;
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string | Array<string>;
}) {
  // Decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, "_id")) return false;

  // Get the session
  const session = await sessionModel.findById(get(decoded, "_id"));

  // Make sure the session is still valid
  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  // Update the session
  return sessionModel.updateOne(query, update);
}
