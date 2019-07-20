import { index } from "../handlers";
import { Route } from "./route";

export const indexRoute: Route = {
  handler: index,
  method: "get",
  path: "/",
};
