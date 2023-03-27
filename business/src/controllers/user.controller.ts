import { Request, Response, NextFunction } from "express";
import {
  getAllUsers,
  getUserByEmailInDatabase,
} from "../services/user.service";

const getAllRegisterdUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await getAllUsers();

    if (!allUsers) {
      res.status(404).json({
        message: "No users found",
      });
    }

    res.status(200).json({
      message: "All users",
      users: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while getting all users",
      error: error,
    });
  }
};

const getPagedUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);

    if (page < 1 || limit < 1) {
      res.status(400).json({
        message: "Page and limit must be greater than 0",
      });
    }

    const allUsers = await getAllUsers();

    if (!allUsers) {
      res.status(404).json({
        message: "No users found",
      });
    }

    if (Array.isArray(allUsers)) {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = {};

      if (endIndex < allUsers.length) {
        results["next"] = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results["previous"] = {
          page: page - 1,
          limit: limit,
        };
      }

      results["results"] = allUsers.slice(startIndex, endIndex);

      res.status(200).json({
        message: "All users",
        users: results,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error while getting all users",
      error: error,
    });
  }
};

const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.params.email;

    const user = await getUserByEmailInDatabase(email);

    if (!user) {
      res.status(404).json({
        message: "No user found",
      });
    }

    res.status(200).json({
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while getting user",
      error: error,
    });
  }
};

export {
  getAllRegisterdUsers,
  getPagedUsers,
  getUserByEmail as getSearchedUser,
};
