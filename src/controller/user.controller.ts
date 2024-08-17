import { Response, Request, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catch-async-error";
import ErrorHandler from "../utils/error-handler";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";

export const createUserHandler = CatchAsyncError(
  async (
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await createUser(req.body);

      return res.status(201).send(user);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
