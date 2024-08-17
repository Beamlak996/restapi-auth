import express, { Request, Response, NextFunction } from "express";
import config from "config";
import { connect } from "./utils/connect";
import { log } from "./utils/logger";
import { ErrorMiddleware } from "./middleware/error-middleware";
import routes from "./routes";

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

app.use("/", routes());

// unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`) as any;
  error.statusCode = 404;
  next(error);
});

app.use(ErrorMiddleware);