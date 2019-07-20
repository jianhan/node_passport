import express, { RequestHandler } from "express";
import { Route } from "../routes/route";
import { Logger } from "winston";

export interface Application {
  setupMiddlewares(...handlers: RequestHandler[]): Application;
  setupRoutes(routes: Route[]): Application;
  express(): express.Application;
}

class ExpressApp implements Application {
  private _express: express.Application;
  private _logger: Logger;

  constructor(logger: Logger) {
    this._express = express();
    this._logger = logger;
  }

  public express(): express.Application {
    return this._express;
  }

  public setupMiddlewares(...handlers: RequestHandler[]): ExpressApp {
    this._logger.debug("initialize middleware");
    this._express.use(handlers);
    return this;
  }

  public setupRoutes(routes: Route[]): ExpressApp {
    for (const route of routes) {
      const { method, path, handler } = route;
      (this._express.route as any)(path)[method](handler);
    }

    return this;
  }
}

export const newApplication = (logger: Logger): Application => new ExpressApp(logger);
