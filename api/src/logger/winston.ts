import expressWinston from "express-winston";
import winston from "winston";

const { combine, printf, label, timestamp } = winston.format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  format: combine(
    label({ label: process.env.NODE_ENV }),
    timestamp(),
    customFormat,
    winston.format.splat(),
    winston.format.simple(),
  ),
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export const winstonMiddleware = expressWinston.logger({
  colorize: false,
  expressFormat: true,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  transports: [new winston.transports.Console()],
});
