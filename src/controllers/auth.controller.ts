import User from "../models/User";
import generateToken from "../utils/generateToken";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import type { NextFunction, Request, Response } from "express";

export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPasswords(password))) {
    return next(new AppError("Invalid email or password", 400));
  }

  res.status(200).json({
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user.id),
  });
});

export const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError("Email Already Taken", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    return next(new AppError("Invalid email or password", 400));
  }

  res.status(201).json({
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user.id),
  });
});