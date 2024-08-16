import mongoose from "mongoose";
import config from "config";
import { log } from "./logger";

export const connect = async (): Promise<void> => {
  const dbUrl = config.get<string>("dbUrl");

  try {
    await mongoose.connect(dbUrl);
    log.info("Connected to DB");
  } catch (error) {
    log.error("Error connecting to DB:", error);

    // Optional: exit process if connection fails
    process.exit(1);
  }
};
