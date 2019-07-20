import express from "express";
import http from "http";

const router = express();
const { PORT = 8008 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`),
);
