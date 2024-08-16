import express from "express";
import config from "config";
import { connect } from "./utils/connect";
import { log } from "./utils/logger";

const app = express();
const port = config.get<number>("port") || 1337;

const startServer = async () => {
  try {
    await connect();
    app.listen(port, () => {
      log.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
