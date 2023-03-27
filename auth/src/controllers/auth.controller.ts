import { Request, Response } from "express";
import User from "../models/user.model";
import {
  getUser,
  encryptPassword,
  comparePassword,
} from "../services/user.service";
import jwt from "jsonwebtoken";
import { secret } from "../config";

const requiredMessage = (res: Response) => {
  return res.status(400).send({ message: "Email and password are required" });
};

const oneDay = 60 * 60 * 24;

export const register = async (req: Request, res: Response) => {
  try {
    if (!req.body) return requiredMessage(res);

    const { email, password } = req.body;

    if (!email || !password) return requiredMessage(res);

    const encryptedPassword = await encryptPassword(password);

    const newUser = new User({ email, password: encryptedPassword });

    const existingUser = await getUser(email);

    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser.id }, secret, { expiresIn: oneDay });

    console.log(token);

    res.status(201).send({ token });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  const userExist = await getUser(email);

  if (!userExist) {
    return res.status(400).send({ message: "User does not exist" });
  }

  const passwordMatch = await comparePassword(password, userExist.password);

  if (!passwordMatch) {
    return res
      .status(400)
      .send({ token: null, message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: userExist.id }, secret, { expiresIn: oneDay });

  res.status(200).send({
    token,
    message: "Login successful",
  });
};
