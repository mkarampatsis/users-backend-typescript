import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const validateObjectId = (param = 'id') => (req: Request, res: Response, next: NextFunction) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
    return res.status(400).json({ message: 'Invalid id' });
  }
  next();
};
