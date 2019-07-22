import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import { Application, RequestHandler } from "express";
import helmet from "helmet";
import { Wrapper } from "../application";
import { winstonMiddleware } from "../logger";

export default class Default implements Wrapper {
  public wrap(app: Application): void {
    const defaultMiddlewares: RequestHandler[] = [
      compression(),
      cors({ credentials: true, origin: true }),
      helmet(),
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      winstonMiddleware,
    ];

    defaultMiddlewares.forEach((h: RequestHandler) => {
      app.use(h);
    });
  }
}
