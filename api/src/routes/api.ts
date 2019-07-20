import { index, test } from "../handlers";
import { Route } from "./route";

export const indexRoute: Route = {
  handler: index,
  method: "get",
  path: "/",
};

export const testRoute: Route = {
  handler: test,
  method: "get",
  path: "/test",
};
