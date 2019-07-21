import { Application } from "express";

export default interface AppWrapper {
  wrap(app: Application): void;
}
