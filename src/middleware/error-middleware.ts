import { Response, Request, NextFunction } from "express";
import ErrorHandler from "../utils/error-handler";
import { log } from "../utils/logger"; 

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // Log the error details
  log.error(
    { err, message: err.message, statusCode: err.statusCode },
    "An error occurred"
  );

  // Specific error handling
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === "ECONNREFUSED") {
    const message = `Network error, Connection refused.`;
    err = new ErrorHandler(message, 503);
  }

  if (err.code === "ETIMEDOUT") {
    const message = `Network error, Request timed out.`;
    err = new ErrorHandler(message, 504);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json web token expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  // Use ErrorHandler for custom error handling
  if (err.name === "ValidationError") {
    throw new ErrorHandler("Invalid user data provided.", 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
