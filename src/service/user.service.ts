import { UserInput, UserModal } from "../models/user.model";
import ErrorHandler from "../utils/error-handler";
import { omit } from "lodash";

export const createUser = async (input: UserInput) => {
  try {
    const existingUser = await UserModal.findOne({ email: input.email });
    if (existingUser) {
      throw new ErrorHandler("Email already in use.", 400);
    }
    const user = await UserModal.create(input);
    return omit(user.toJSON(), "password");
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    throw new ErrorHandler("Failed to create user.", 500);
  }
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (!email || !password) {
    throw new ErrorHandler("Email and password are required", 400);
  }

  try {
    const user = await UserModal.findOne({ email });
    if (!user) {
      throw new ErrorHandler("Email or password is incorrect.", 401);
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
      throw new ErrorHandler("Email or password is incorrect.", 401);
    }

    return omit(user.toJSON(), "password");
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    throw new ErrorHandler("Something went wrong.", 500);
  }
};
