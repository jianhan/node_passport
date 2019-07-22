import { Application, NextFunction, Request, Response } from "express";
import { Wrapper } from "../application";
import { User } from "./Model";

export default class Handler implements Wrapper {
  public wrap(app: Application): void {
    app.post(
      "/signup",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const user = await User.create(req.body);
          console.log(user);
          // return res.status(200).json(user.toAuthJSON());
          return res.status(200).json("succes");
        } catch (e) {
          return res.status(400).json(e);
        }
      },
    );
  }
}
