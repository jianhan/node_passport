import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import { RequestHandler } from "express";
import helmet from "helmet";
import morgan from "morgan";

export interface Middlewares {
  all(): RequestHandler[];
  addMiddlewares(...handlers: RequestHandler[]): Middlewares;
}

class DefaultMiddleWares implements Middlewares {
  private _handlers: RequestHandler[] = [];

  constructor() {
    this.initDefaultMiddlewares();
  }

  public all(): RequestHandler[] {
    return this._handlers;
  }

  public addMiddlewares(...handlers: RequestHandler[]): Middlewares {
    this._handlers = [...this._handlers, ...handlers];
    return this;
  }

  private initDefaultMiddlewares(): void {
    const defaultMiddlewares: RequestHandler[] = [
      morgan("combined"),
      compression(),
      cors({ credentials: true, origin: true }),
      helmet(),
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
    ];
    this._handlers = [...this._handlers, ...defaultMiddlewares];
  }
}

export const initMiddlewares = (): Middlewares => {
  return new DefaultMiddleWares();
};
