import { NextFunction, Request, Response } from "express";

import { winstonLogger } from "../loggers";

export const errorInternalServer = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(500).send("Internal Server Error");
  winstonLogger.error(`${err.name}: ${err.message}`);
  next(err);
};
