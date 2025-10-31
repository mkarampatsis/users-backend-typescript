import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const validateObjectId = 
  // If no argument is passed when calling validateObjectId(...), use 'id' as the default value
  (param = 'id') => 
    (req: Request, res: Response, next: NextFunction) => {
      const value = req.params[param];
      if (!value || !mongoose.Types.ObjectId.isValid(value)) {
        return res.status(400).json({ message: 'Invalid id' });
      }
      next();
    };