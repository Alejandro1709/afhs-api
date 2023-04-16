import User from "../models/User";
import AppError from "../utils/AppError";
import generateToken from "../utils/generateToken";
import type { NextFunction, Request, Response } from "express";

export const getAuthUser = async (req: any, res: Response, next: NextFunction) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user.id),
  });
};
