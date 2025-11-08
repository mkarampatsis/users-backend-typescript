import User, { IUser } from '../models/user.model';
import Role, { IRole } from '../models/role.model';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

export const findUsers = async (filter: any = {}) => {
  return User.find(filter).populate('roles').lean();
};

export const findUserById = async (id: string) => {
  return User.findById(id).populate('roles').lean();
};

export const findUserByEmail = async (email: string) => {
  return User.findOne({email:email}).populate('roles').lean();
};

export const findUserByUsername = async (username: string) => {
  return User.findOne({ username }).populate('roles');
};

// For Partial Type
// https://www.typescriptlang.org/docs/handbook/utility-types.html
export const createUser = async (payload: Partial<IUser>) => {
  if (payload.password) {
    const hash = await bcrypt.hash(payload.password, SALT_ROUNDS);
    payload.password = hash;
  }

  let roleIds: Types.ObjectId[] = [];
  console.log("Create User", payload);
  if (payload.roles && payload.roles.length > 0) {
    roleIds = payload.roles as any;
  } else {
    let reader: IRole | null = await Role.findOne({ role: 'READER' });
    if (!reader) {
      reader = await Role.create({ role: 'READER', description: 'Default reader role', active: true });
    }
    roleIds = [reader._id];
  }

  const user = new User({ ...payload, roles: roleIds });
  return user.save();
};

export const updateUser = async (username: string, payload: Partial<IUser>) => {
  if (payload.password) {
    const hash = await bcrypt.hash(payload.password, SALT_ROUNDS);
    payload.password = hash;
  }
  return User.findOne({username:username}, { new: true }).populate('roles');
};

export const deleteUser = async (username: string) => {
  return User.findOneAndDelete({username:username});
};
