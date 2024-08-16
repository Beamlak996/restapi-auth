import { Response, Request, NextFunction } from "express";
import ErrorHandler from "../utils/error-handler";

export const ErrorMiddleware = (
  err: any,
  res: Response,
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 1100) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Network Error
  if (err.code === "ECONNREFUSED") {
    const message = `Network error, Connection refused.`;
    err = new ErrorHandler(message, 503); // Service Unavailable
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  // jwt expire error
  if (err.name === "TokenExpireError") {
    const message = `Json web token expire, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
