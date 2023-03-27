import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { secret } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token as string, secret);

    if (!decoded || typeof decoded === "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = decoded as JwtPayload;

    const user = await User.findById(id, { password: 0 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.body.user = user;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
