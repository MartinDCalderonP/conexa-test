import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const getUser = async (email: string): Promise<IUser | null> => {
  try {
    const res = await User.findOne({ email });
    if (!res) return null;
    return res;
  } catch (err) {
    throw err;
  }
};

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  receivedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, receivedPassword);
};
