import User from "../models/User";
import type { Request, Response } from "express";
import generateToken from "../utils/generateToken";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPasswords(password))) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}