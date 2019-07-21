import express from "express";
import mongoose from "mongoose";
import { Logger } from "winston";
import { MONGO_DB, MONGO_HOST, MONGO_PORT } from "../configs";
import Application from "./Application";
import Wrapper from "./Wrapper";

class APIApp implements Application {
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

  public applyWrappers(...wrappers: Wrapper[]): Application {
    this._logger.debug("wrappers applied");
    wrappers.forEach((w: Wrapper) => w.wrap(this._express));
    return this;
  }

  private initMongo(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, {
      useNewUrlParser: true,
    });
  }
}

export default (logger: Logger): Application => new APIApp(logger);
