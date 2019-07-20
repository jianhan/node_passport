import { Request, Response } from "express";

export const index = (_: Request, res: Response) => {
  res.status(200).send({
    message: "get request successfulll!!!!",
  });
};
