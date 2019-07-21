import { Application, NextFunction, Request, Response } from "express";
import AppWrapper from "../application/AppWrapper";

const handler404 = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).send({ message: "Route" + req.url + " Not found." });
};

const handler500 = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(500).send({ error: err });
};

export default class Errors implements AppWrapper {
  public wrap(app: Application): void {
    app.use([handler404, handler500]);
  }
}
