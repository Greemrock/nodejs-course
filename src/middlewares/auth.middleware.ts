import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../shared/constant";
import { HttpStatusCode } from "../utils";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["x-access-token"] as string;

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        res
          .status(HttpStatusCode.UNAUTHORIZED_ERROR)
          .json("Failed to authenticate token.");
      } else {
        next();
      }
    });
  } else {
    res.status(HttpStatusCode.FORBIDDEN_ERROR).json("Unauthorized.");
  }
};
