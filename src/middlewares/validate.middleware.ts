import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const toValidate = {
      body: req.body,
      query: req.query,
      params: req.params
    };
    schema.parse(toValidate.body);
    next();
  } catch (err: any) {
    return res.status(400).json({ message: err?.errors || err?.message || 'Validation error' });
  }
};
