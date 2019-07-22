import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { newApplication } from "./application";
import { PORT } from "./configs";
import { logger } from "./logger";
import middlewares from "./middlewares";
import Errors from "./middlewares/Errors";
import Handler from "./user/Handler";

const app = newApplication(logger);
app
  .applyWrappers(...middlewares)
  .applyWrappers(new Handler())
  .applyWrappers(new Errors());

const server = http.createServer(app.express());

server.listen(PORT, () =>
  logger.info(`Server is running http://localhost:%s`, PORT),
);
