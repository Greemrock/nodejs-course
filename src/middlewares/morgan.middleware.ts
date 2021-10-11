import { Request, Response } from "express";
import morgan from "morgan";
import chalk from "chalk";

export const morganMiddleware = morgan(function (
  tokens,
  req: Request,
  res: Response
) {
  return [
    chalk.blue("info:"),
    chalk.yellow.bold(tokens.method(req, res)),
    chalk.yellow.bold(tokens.status(req, res)),
    chalk.magenta(tokens.url(req, res)),
    Object.keys(req.body).length
      ? chalk.yellow("body:") + ` ${JSON.stringify(req.body)}`
      : "",
    chalk.greenBright(tokens["response-time"](req, res) + " ms"),
  ].join(" ");
});
