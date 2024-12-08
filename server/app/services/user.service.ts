import bcrypt from "bcrypt";
import { omit } from "lodash";

import db from "../../models";
import { UserAttributes } from "../../models/user";

export async function findUser(query: string, replaceObj: object) {
  const user = await db.sequelize.query(query, {
    replacements: replaceObj,
    type: db.sequelize.QueryTypes.SELECT,
  });

  if (!user) {
    return false;
  }

  return omit(user["0"], "password");
}

export async function validatePassword({
  email,
  password,
}: {
  email: UserAttributes["email"];
  password: string;
}) {
  // const user = await userModel.findOne({ email });
  const user = await db.sequelize.query(
    `SELECT * FROM social_one.users WHERE email = :email;`,
    { replacements: { email }, type: db.sequelize.QueryTypes.SELECT }
  );

  if (!user) {
    return false;
  }

  // const isValid = await user.comparePassword(password);
  const isValid = bcrypt
    .compare(password, user["0"].password)
    .catch((e) => false);

  if (!isValid) {
    return false;
  }

  return omit(user["0"], "password");
}
