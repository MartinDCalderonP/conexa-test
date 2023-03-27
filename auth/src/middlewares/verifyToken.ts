import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../config";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, secret);

    req.body.userData = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};

export default verifyToken;
