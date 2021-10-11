import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { winstonLogger } from "../loggers";

import { SECRET_KEY } from "../shared/constant";
import { HttpStatusCode } from "../utils";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers["x-access-token"] as string;

    if (token) {
      jwt.verify(token, SECRET_KEY);
      next();
    } else {
      res
        .status(HttpStatusCode.UNAUTHORIZED_ERROR)
        .json("Failed to authenticate token.");
      winstonLogger.error("Failed to authenticate token.");
    }
  } catch (error) {
    res.status(HttpStatusCode.FORBIDDEN_ERROR).send(error.message);
    winstonLogger.error(`${error.name}: ${error.message}`);
  }
};
