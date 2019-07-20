import { NextFunction, Response } from "express";
import { HTTP404Error } from "../errors/Http404Error";
import HttpClientError from "../errors/HttpClientError";
import { logger } from "../logger/winston";

export const notFoundError = () => {
  throw new HTTP404Error("not found");
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HttpClientError) {
    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

export const serverError = (err: Error, res: Response) => {
  if (process.env.NODE_ENV === "production") {
    res.status(500).send("Internal Server Error");
  } else {
    logger.error("server error occur %s", err.stack);
    res.status(500).send(err.stack);
  }
};
