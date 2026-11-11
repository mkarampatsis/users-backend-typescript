import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const validateObjectId = 
  // If no argument is passed when calling validateObjectId(...), use 'id' as the default value
  (param = 'id') => 
    (req: Request, res: Response, next: NextFunction) => {
      const param = req.params.id;
      // const param = req.params[param];
      if (typeof param !== "string") {
        throw new Error("Expected one id parameter");
      }
      const value: string = param;
      if (!value || !mongoose.Types.ObjectId.isValid(value)) {
        return res.status(400).json({ message: 'Invalid id' });
      }
      next();
    };