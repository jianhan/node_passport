import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { newApplication } from "./application";
import { logger } from "./logger";
import { initMiddlewares } from "./middlewares";
import routes from "./routes";

const app = newApplication(logger);
app.setupMiddlewares(...initMiddlewares().all()).setupRoutes(routes);

const { PORT = 8008 } = process.env;
const server = http.createServer(app.express());

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`),
);
