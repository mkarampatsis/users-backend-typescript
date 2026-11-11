import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const validateEmail =
  (paramName = "email") =>
  (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[paramName];
    console.log("Email>>", value)
    if (typeof value !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    next();
  };