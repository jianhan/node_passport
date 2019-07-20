import { NextFunction, Request, Response } from "express";
import * as errorHandlers from "../handlers/errors";
import { logger } from "../logger/winston";

const handle404Error = () => {
  errorHandlers.notFoundError();
};

const handleClientError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.debug(req.body);
  errorHandlers.clientError(err, res, next);
};

const handleServerError = (err: Error, req: Request, res: Response) => {
  logger.debug(req.body);
  errorHandlers.serverError(err, res);
};

export default [handle404Error, handleClientError, handleServerError];
