import { Request, Response } from "express";
import { Route } from "./route";

export const indexRoute: Route = {
    handler: (_: Request, res: Response) => {
    res.status(200).send({
      message: "GET request successfulll!!!!",
    });
  },
  method: "get",
  path: "/",
};
