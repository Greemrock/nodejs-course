import { addColors, createLogger, format, transports } from "winston";

const { combine, colorize, simple } = format;

const colors = {
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "magenta",
  debug: "white",
};

addColors(colors);

const formatLogger = combine(colorize({ all: true }), simple());

const transportsLogger = [new transports.Console()];

export const winstonLogger = createLogger({
  format: formatLogger,
  transports: transportsLogger,
});
