import { Application } from "express";

export default interface Wrapper {
  wrap(app: Application): void;
}
