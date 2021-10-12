import jwt from "jsonwebtoken";

import { UserModel } from "./../../models";

export const login = async (user: UserModel) => {
  const token = jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRATION_TIME,
  });
  return token;
};
