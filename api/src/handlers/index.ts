import { NextFunction, Request, Response } from "express";
import { HTTP404Error } from "../errors/Http404Error";
import HttpClientError from "../errors/HttpClientError";
import { logger } from "../logger/winston";

export const index = (req: Request, res: Response) => {
  logger.debug(req.body);
  res.status(200).send({
    message: "get request successfulll!!!!",
  });
};

export const test = (req: Request, res: Response) => {
  logger.debug(req.body);
  res.status(200).send({
    message: "test",
  });
};

export const error404 = () => {
  throw new HTTP404Error("Method not found.");
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
