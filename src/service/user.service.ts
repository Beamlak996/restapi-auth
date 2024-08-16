import { UserInput, UserModal } from "../models/user.model";
import ErrorHandler from "../utils/error-handler";

export const createUser = async (input: UserInput) => {
  try {
    const user = await UserModal.create(input);
    return user;
  } catch (error) {
    throw new ErrorHandler("Failed to create user.", 500);
  }
}
