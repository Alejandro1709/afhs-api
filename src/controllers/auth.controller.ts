import type { Request, Response } from "express";

export const loginUser = async (req: Request, res: Response) => {
  res.send("Login");
}

export const registerUser = async (req: Request, res: Response) => {
  res.send("Register");
}