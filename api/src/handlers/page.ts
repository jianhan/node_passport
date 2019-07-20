import { NextFunction, Request, Response, Router } from "express";

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;
