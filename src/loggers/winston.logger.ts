import { addColors, createLogger, format, transports } from "winston";

const { combine, timestamp, colorize, printf } = format;

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

addColors(colors);

const formatLogger = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  colorize({ all: true }),
  printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transportsLogger = [new transports.Console()];

export const winstonLogger = createLogger({
  format: formatLogger,
  transports: transportsLogger,
});
