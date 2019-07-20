import dotenv from "dotenv";
import http from "http";
import { newApplication } from "./application/Application";
import { initMiddlewares } from "./middlewares/Middlewares";
import routes from "./routes";

dotenv.config();

const app = newApplication();
app.setupMiddlewares(...initMiddlewares().all()).setupRoutes(routes);

const { PORT = 8008 } = process.env;
const server = http.createServer(app.express());

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`),
);
