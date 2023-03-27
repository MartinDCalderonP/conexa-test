import { Error } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";

const getAllUsers = async () => {
  const allUsers = await User.find()
    .then((users: IUser[]) => {
      if (users.length === 0) {
        return [];
      }

      const usersEmails = users.map((user: IUser) => user.email);

      return usersEmails;
    })
    .catch((error: Error) => {
      return [];
    });

  return allUsers;
};

const getUserByEmailInDatabase = async (email: string) => {
  const user = User.findOne({ email: email })
    .then((user: IUser) => {
      const userEmail = user.email;

      return {
        email: userEmail,
      };
    })
    .catch((error: Error) => {
      return null;
    });

  return user;
};

export { getAllUsers, getUserByEmailInDatabase };
