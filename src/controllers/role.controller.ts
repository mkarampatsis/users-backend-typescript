import { Request, Response, NextFunction } from 'express';
import * as roleService from '../services/role.service';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const r = await roleService.createRole(req.body);
    res.status(201).json(r);
  } catch (err) { next(err); }
};

export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rs = await roleService.findAllRoles();
    res.json(rs);
  } catch (err) { next(err); }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const r = await roleService.updateRole(req.params.id!, req.body);
    res.json(r);
  } catch (err) { next(err); }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const r = await roleService.deleteRole(req.params.id!);
    res.json({ deleted: !!r });
  } catch (err) { next(err); }
};
