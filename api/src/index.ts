import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { newApplication } from "./application";
import { logger } from "./logger";
import { initMiddlewares } from "./middlewares";
import errorHandlers from "./middlewares/errors";
import routes from "./routes";

const app = newApplication(logger);
app.setupMiddlewares(...initMiddlewares().all()).setupRoutes(routes);
app.express().use(errorHandlers);

const { PORT = 8008 } = process.env;
const server = http.createServer(app.express());

server.listen(PORT, () =>
  logger.info(`Server is running http://localhost:%s`, PORT),
);
