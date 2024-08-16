import mongoose from "mongoose";
import config from "config";

export const connect = async (): Promise<void> => {
  const dbUrl = config.get<string>("dbUrl");

  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    
    // Optional: exit process if connection fails
    process.exit(1);
  }
};
