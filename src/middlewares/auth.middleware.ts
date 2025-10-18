import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

declare global {
  namespace Express {
    interface Request { user?: any }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing token' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// declare global
// You are saying:
// “For all Express Request objects in my project, add an optional property called user.”
// Now, TypeScript globally knows that every Request can have a user field.
// After merging, the Request interface effectively becomes:
// interface Request {
//   // built-in properties (headers, params, body, etc.)
//   user?: any; // added by you
// }
