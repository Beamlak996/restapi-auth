import mongoose, { Document } from "mongoose";
import bcryptjs from "bcryptjs";
import config from "config";

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (canidatePassword: string) => Promise<boolean>;
}

export const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre<UserDocument>("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcryptjs.genSalt(config.get<number>("saltWorkFactor"));
  const passwordHash = await bcryptjs.hash(user.password, salt);

  user.password = passwordHash;

  return next();
});

userSchema.methods.comparePassword = async function (
  canidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return await bcryptjs
    .compare(canidatePassword, user.password)
    .catch(() => false);
};

export const UserModal = mongoose.model("User", userSchema);
