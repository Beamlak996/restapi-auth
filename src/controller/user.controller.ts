import { Response, Request, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catch-async-error";
import ErrorHandler from "../utils/error-handler";
import { createUser } from "../service/user.service";

export const createUserHandler = CatchAsyncError( async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createUser(req.body)
    } catch (error: any) {
         return next(new ErrorHandler(error.message, 400));
    }
})