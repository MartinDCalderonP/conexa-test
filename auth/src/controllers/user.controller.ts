import { Request, Response, NextFunction } from "express";
import { get } from "../services/api.service";
import { authUrl } from "../config";

const defaultPage = 1;
const defaultLimit = 10;

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    const fetchedUsers = await get("/all", {
      headers: {
        Authorization: token,
        Origin: authUrl,
      },
    });

    if (fetchedUsers.data.users) {
      console.log(fetchedUsers.data.users);

      return res.status(200).json({
        message: "Users fetched successfully",
        users: fetchedUsers.data.users,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getPagedUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const page = req.query.page || defaultPage;
    const limit = req.query.limit || defaultLimit;

    const fetchedUsers = await get(`/page=${page}&limit=${limit}`, {
      headers: {
        Authorization: token,
        Origin: authUrl,
      },
    });

    return res.status(200).json({
      message: "Users fetched successfully",
      users: fetchedUsers.data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const email = req.params.email;

    const fetchedUser = await get(`/email=${email}`, {
      headers: {
        Authorization: token,
        Origin: authUrl,
      },
    });

    return res.status(200).json({
      message: "User fetched successfully",
      user: fetchedUser.data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
