import { omit } from "lodash";
import { FilterQuery } from "mongoose";

import userModel, { UserDocument } from "../models/user.model";

export async function createUser(input: UserDocument) {
  try {
    return await userModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findUser(query:FilterQuery<UserDocument>) {
  const user = await userModel.findOne(query).lean();

  if (!user) {
    return false;
  }

  return omit(user, "password");
}

export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}) {
  const user = await userModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}
