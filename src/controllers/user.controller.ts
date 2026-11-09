import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { IUser } from '../models/user.model';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.findUsers();
    res.status(200).json(result);
  } catch (err) { 
    next(err);
  }
};

export const getOneById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    // Δύο τρόποι για να μην βγάζει error στο const id: string = req.params.id!;
    // ο ένας στο request να βάλω <{ id: string }> αντί μόνο req: Request
    // Ο άλλος όπως πιο κάτω στο email να κάνω έλεγχο για την μεταβλητή με if (typeof param !== "string") 
    const id: string = req.params.id!;
    const result = await userService.findUserById(id);
    if (!result) return res.status(404).json({ message: 'User not found by id' });
    res.status(200).json(result);
  } catch (err) { 
    next(err);
  }
};

export const getOneByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const param = req.params.email;
    if (typeof param !== "string") {
      throw new Error("Expected one email parameter");
    }
    const email: string = param;
    const result = await userService.findUserByEmail(email);
    if (!result) return res.status(404).json({ message: 'User not found by email' });
    res.status(200).json(result);
  } catch (err) { 
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: CreateUserDTO = req.body;   // <-- DTO, not IUser
    const result = await userService.createUser(data);
    if (!result) {
      return res.status(404).json({ message: "User not created" });
    }
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username: string = req.params.username!;
    const data: UpdateUserDTO = req.body;   // <-- DTO, not IUser

    const result = await userService.updateUser(username, data);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username: string = req.params.username!;
    const result = await userService.deleteUser(username);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ deleted: result });
  } catch (err) { 
    next(err);
  }
};
