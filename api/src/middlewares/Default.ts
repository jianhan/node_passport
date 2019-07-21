import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import { Application, RequestHandler } from "express";
import helmet from "helmet";
import morgan from "morgan";
import AppWrapper from "../application/AppWrapper";

export default class Default implements AppWrapper {
  public wrap(app: Application): void {
    const defaultMiddlewares: RequestHandler[] = [
      morgan("combined"),
      compression(),
      cors({ credentials: true, origin: true }),
      helmet(),
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
    ];

    defaultMiddlewares.forEach((h: RequestHandler) => {
      app.use(h);
    });
  }
}
