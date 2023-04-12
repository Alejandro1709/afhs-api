import User from "../models/User";
import generateToken from "../utils/generateToken";
import catchAsync from "../utils/catchAsync";
import type { Request, Response } from "express";

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

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
});

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({ message: "Invalid User Data" });
  }
});