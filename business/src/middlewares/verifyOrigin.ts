import { Request, Response, NextFunction } from "express";
import { authUrl } from "../config";

const allowedOrigins = [authUrl];

export const verifyOrigin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const origin = req.headers.origin;

    if (!origin) {
      return res.status(403).json({ message: "No origin provided" });
    }

    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
    } else {
      return res.status(403).json({ message: "Origin not allowed" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyOrigin;
