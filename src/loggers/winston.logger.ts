import { NextFunction, Request, Response } from "express";
import winston from "winston";

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({ filename: "logs/all.log" }),
];

export const winstonLogger = winston.createLogger({
  level: "error",
  format,
  transports,
});

export function errorInternalServer(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(500).send("Internal Server Error");
  winstonLogger.error(`${err.name}: ${err.message}`);
  next(err);
}
