import { Omit } from "lodash";
import db from "../../models";
import { UserAttributes } from "../../models/user";
import { SessionAttributes } from "../../models/session";
import dotenv from "dotenv";

// Utils
import { sign, decode } from "../utils/jwt.utils";
import { findUser } from "./user.service";

dotenv.config();

export async function createSession(
  userId: UserAttributes["id"],
  userAgent: string,
  ip?: string
) {
  const query = `
      INSERT INTO social_one.sessions (user_id, userAgent, ip)
      VALUES (:user_id, :userAgent, :ip);
    `;
  const saveSession = await db.sequelize.query(query, {
    replacements: {
      id: "",
      user_id: userId,
      userAgent,
      ip,
    },
    type: db.sequelize.QueryTypes.INSERT,
  });

  const getSavedSession = await db.sequelize.query(
    `SELECT * FROM social_one.sessions WHERE user_id=:user_id AND ip=:ip ORDER BY createdAt ASC limit 1;`,
    {
      replacements: { user_id: userId, ip },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );

  return getSavedSession[0];
}

export async function createAccessToken({
  userId,
  session,
}: {
  userId: UserAttributes["id"];
  session: Omit<SessionAttributes, "password">;
}) {
  let identifier = "id";
  let query = `SELECT * FROM social_one.users WHERE ${identifier} = :${identifier};`;
  let obj = { id: userId };

  const user = await findUser(query, obj);

  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session.id },
    { expiresIn: process.env.accessTokenTtl } // 60 minutes
  );

  return accessToken;
}

// export async function reIssueAccessToken({
//   refreshToken,
// }: {
//   refreshToken: string | Array<string>;
// }) {
//   // Decode the refresh token
//   const { decoded } = decode(refreshToken);

//   if (!decoded || !get(decoded, "_id")) return false;

//   // Get the session
//   const session = await sessionModel.findById(get(decoded, "_id"));

//   // Make sure the session is still valid
//   if (!session || !session?.valid) return false;

//   const user = await findUser({ _id: session.user });

//   if (!user) return false;

//   const accessToken = createAccessToken({ user, session });

//   return accessToken;
// }

// export async function updateSession(
//   query: FilterQuery<SessionDocument>,
//   update: UpdateQuery<SessionDocument>
// ) {
//   // Update the session
//   return sessionModel.updateOne(query, update);
// }
