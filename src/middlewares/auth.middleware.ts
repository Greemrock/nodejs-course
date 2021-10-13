import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { winstonLogger } from "../loggers";

import { HttpStatusCode } from "../utils";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const token = authorization.split(" ")[1];

      jwt.verify(token, process.env.SECRET_KEY);
    } else {
      res
        .status(HttpStatusCode.UNAUTHORIZED_ERROR)
        .json("Failed to authenticate token.");
      winstonLogger.error("Failed to authenticate token.");
    }
    next();
  } catch (error) {
    res.status(HttpStatusCode.FORBIDDEN_ERROR).send(error.message);
    winstonLogger.error(`${error.name}: ${error.message}`);
  }
};
