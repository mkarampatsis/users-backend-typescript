import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const validateObjectId = 
  (param = 'id') => 
    (req: Request, res: Response, next: NextFunction) => {
      const value = req.params[param];
      if (!value || !mongoose.Types.ObjectId.isValid(value)) {
        return res.status(400).json({ message: 'Invalid id' });
      }
      next();
    };
