import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catch-async-error";
import { validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";
import ErrorHandler from "../utils/error-handler";

export const createUserSessionHandler = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await validatePassword(req.body);

        const session = await createSession(
          user._id as string,
          req.get("user-agent") || ""
        );
    } catch (error) {
        throw new ErrorHandler("Internal server error", 500)
    }
    
  }
);
