import jwt from "jsonwebtoken";

import { SECRET_KEY, EXPIRATION_TIME } from "../../shared/constant";

export const login = (id: string) => {
  const token = jwt.sign({ id }, SECRET_KEY, {
    expiresIn: EXPIRATION_TIME,
  });
  return token;
};
