import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catch-async-error";
import { validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";
import ErrorHandler from "../utils/error-handler";
import { signJwt } from "../utils/jwt.utils";
import config from "config"

export const createUserSessionHandler = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await validatePassword(req.body);

      const session = await createSession(
        user._id as string,
        req.get("user-agent") || ""
      );

      const accessToken = signJwt(
        {
          ...user,
          session: session._id,
        },
        { expiresIn: config.get("accessTokenTtl") }
      );

      // create a refresh token
      const refreshToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("refreshTokenTtl") }
      );

      return res.send({ accessToken, refreshToken });
    } catch (error) {
      console.error("Error in createUserSessionHandler:", error);
        throw new ErrorHandler("Internal server error", 500)
    }
    
  }
);
