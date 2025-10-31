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

// “If no argument is passed when calling validateObjectId(...), use 'id' as the default value.”
// So:
// When you call validateObjectId('id') → param becomes 'id'
// When you call validateObjectId() (no argument) → param also becomes 'id', because that’s the default