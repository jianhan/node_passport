import express, { RequestHandler } from "express";
import { Route } from "../routes/route";

export interface Application {
  setupMiddlewares(...handlers: RequestHandler[]): Application;
  setupRoutes(routes: Route[]): Application;
  express(): express.Application;
}

class ExpressApp implements Application {
  private _express: express.Application;

  constructor() {
    this._express = express();
  }

  public express(): express.Application {
    return this._express;
  }

  public setupMiddlewares(...handlers: RequestHandler[]): ExpressApp {
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

export const newApplication = (): Application => new ExpressApp();
