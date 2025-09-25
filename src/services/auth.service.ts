import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'change_me';
const JWT_EXPIRES = '7d';

export const register = async (data: any) => {
  // create user via user service logic would be nicer, but keep simple
  const user = new User(data);
  await user.save();
  return user;
};

export const login = async (username: string, password: string) => {
  const user = await User.findOne({ username }).populate('roles');
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  const payload = { id: user._id, username: user.username, roles: user.roles };
  const token = jwt.sign(payload as any, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  return { user, token };
};
