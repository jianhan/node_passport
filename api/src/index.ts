import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { newApplication } from "./application";
import { PORT } from "./configs";
import { logger } from "./logger";
import { defaultWrappers, errorWrappers } from "./middlewares";
import Handler from "./user/Handler";

const app = newApplication(logger);
app
  .applyWrappers(defaultWrappers)
  .applyWrappers(new Handler())
  .applyWrappers(errorWrappers);

const server = http.createServer(app.express());

server.listen(PORT, () =>
  logger.info(`Server is running http://localhost:%s`, PORT),
);
