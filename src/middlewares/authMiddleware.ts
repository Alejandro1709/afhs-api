import jwt from 'jsonwebtoken';
import User from '../models/User';
import secrets from '../config/secrets';
import type { Request, Response, NextFunction } from 'express';

const { JWT_SECRET } = secrets;

export const protect = async (req: any, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, JWT_SECRET as string);

      if (typeof decoded === 'string') {
        return res.status(401).json({ message: 'Not authorized, token failed' });
      }

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    console.error('Not authorized, token failed');
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
}