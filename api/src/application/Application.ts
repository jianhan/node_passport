import express from "express";
import mongoose from "mongoose";
import { Logger } from "winston";
import { MONGO_DB, MONGO_HOST, MONGO_PORT } from "../configs";
import AppWrapper from "./AppWrapper";

export interface Application {
  express(): express.Application;
  applyWrappers(...wrappers: AppWrapper[]): Application;
}

class ExpressApp implements Application {
  private _express: express.Application;
  private _logger: Logger;

  constructor(logger: Logger) {
    this._express = express();
    this._logger = logger;
    this.initMongo();
  }

  public express(): express.Application {
    return this._express;
  }

  public applyWrappers(...wrappers: AppWrapper[]): Application {
    this._logger.debug("wrappers applied");
    wrappers.forEach((w: AppWrapper) => w.wrap(this._express));
    return this;
  }

  private initMongo(): void {
    mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, {
      useNewUrlParser: true,
    });
    mongoose.Promise = global.Promise;
  }
}

export const newApplication = (logger: Logger): Application =>
  new ExpressApp(logger);
