// app configs
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8808;

// mongodb configs
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DB = process.env.MONGO_HOST || "node_passport_development";

export { NODE_ENV, PORT, MONGO_HOST, MONGO_PORT, MONGO_DB };