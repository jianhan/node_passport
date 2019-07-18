import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

export default class App {
  private _express: express.Application;

  private _corsAllowedHeaders: string[];
  private _corsMethods: string[];
  private _corsOrigins: string[];

  constructor(
    corsAllowedHeaders: string[] = [],
    corsMethods: string[] = [],
    corsOrigins: string[] = [],
  ) {
    this._express = express();
    this.initMiddlewares().initRoutes();
    this._corsAllowedHeaders =
      corsAllowedHeaders.length === 0
        ? ["Content-Type", "Authorization"]
        : corsAllowedHeaders;
    this._corsMethods =
      corsMethods.length === 0 ? ["POST", "GET"] : corsMethods;
    this._corsOrigins =
      corsOrigins.length === 0 ? ["http://localhost:3001"] : corsOrigins;
  }

  public express(): express.Application {
    return this._express;
  }

  private initMiddlewares(): App {
    this._express.use(morgan("combined"));
    this._express.use(compression());
    this._express.use(
      cors({
        allowedHeaders: this._corsAllowedHeaders,
        methods: this._corsMethods,
        origin: this._corsOrigins,
      }),
    );
    this._express.use(helmet());
    this._express.use(bodyParser.json());
    this._express.use(bodyParser.urlencoded({ extended: true }));

    return this;
  }

  private initRoutes(): App {
    const router = express.Router();
    router.get("/", (req, res) => {
      res.json({
        message: "Hello World!",
      });
    });
    this._express.use("/", router);

    return this;
  }
}