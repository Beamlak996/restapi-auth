import express from "express";
import config from "config";
import { connect } from "./utils/connect";

const app = express();
const port = config.get<number>("port") || 1337;

const startServer = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
