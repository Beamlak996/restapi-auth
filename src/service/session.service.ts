import SessionModel from "../models/session.model"
import ErrorHandler from "../utils/error-handler";

export const createSession = async (userId: string, userAgent: string) => {
  try {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
  } catch (error) {
    console.error("Error creating session:", error); // Log the exact error
    throw new ErrorHandler("Failed to create a session.", 500);
  }
};
