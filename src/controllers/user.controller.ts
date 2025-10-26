import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) { next(err); }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter: any = {};
    if (req.query.municipality) filter['address.municipality'] = req.query.municipality;
    const users = await userService.findUsers(filter);
    res.json(users);
  } catch (err) { next(err); }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // To είχαμε έτσι και εμφάνιζε μήνυμα για req.params.id γιατί μπορεί να μην υπάρχει
    // const user = await userService.findUserById(req.params.id);
    // Δύο λύσεις ή req.params.id! ή
    // if (!req.params.id) {
    //   return res.status(400).json({ message: 'Missing user ID' });
    // }
    // const user = await userService.findUserById(req.params.id);
    const user = await userService.findUserById(req.params.id!);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.updateUser(req.params.id!, req.body);
    res.json(user);
  } catch (err) { next(err); }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const r = await userService.deleteUser(req.params.id!);
    res.json({ deleted: !!r });
  } catch (err) { next(err); }
};
