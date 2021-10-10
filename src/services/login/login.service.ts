import jwt from "jsonwebtoken";

import { UserModel } from "./../../models";
import { SECRET_KEY, TOKEN_EXPIRATION_TIME } from "../../shared/constant";

export const login = async (user: UserModel) => {
  const token = jwt.sign({ user }, SECRET_KEY, {
    expiresIn: TOKEN_EXPIRATION_TIME,
  });
  return token;
};
