import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

declare global {
  namespace Express {
    interface Request { user?: any }
  }
}

/**
 * Define the structure of your JWT payload here.
 * You can adjust this interface according to what your tokens contain.
 */
export interface AuthPayload extends JwtPayload {
  username: string;  // user ID
  email: string;    // user email
  role?: string;    // optional: user role, etc.
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in environment variables');
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // const header = req.headers.authorization;
  // if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing token' });
  // const token = header.split(' ')[1];
  // try {
  //   const payload = jwt.verify(token, JWT_SECRET);
  //   req.user = payload;
  //   next();
  // } catch (err) {
  //   return res.status(401).json({ message: 'Invalid token' });
  // }
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing or invalid Authorization header' });
    return;
  }

  const token = header.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Invalid Authorization format' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
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
