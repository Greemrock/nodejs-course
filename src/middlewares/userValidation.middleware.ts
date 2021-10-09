import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";

import { winstonLogger } from "../loggers";

const schema = Joi.object({
  login: Joi.string().required().min(4).max(30),
  password: Joi.string()
    .required()
    .regex(
      /^(\d+[a-zA-Z]|[a-zA-Z]+\d)(\d|[a-zA-Z])/,
      "only letters and numbers"
    )
    .min(4)
    .max(30),
  age: Joi.number().required().min(4).max(130),
});

export const validator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    winstonLogger.error(err);
    res.status(400).send(err.message);
  }
};
