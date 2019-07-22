import { Application, NextFunction, Request, Response } from "express";
import { Wrapper } from "../application";
import { authLocal } from "../passport/strategies";
import { User } from "./Model";

export default class Handler implements Wrapper {
  public wrap(app: Application): void {
    app.post(
      "/login",
      authLocal,
      (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json(req.user.toAuthJSON());
      },
    );

    app.post(
      "/signup",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const user = await User.create(req.body);
          return res.status(200).json(user.toAuthJSON());
        } catch (e) {
          return res.status(400).json(e);
        }
      },
    );
  }
}
