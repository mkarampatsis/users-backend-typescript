import { connectDB } from '../utils/db';
import Role from '../models/role.model';
import User from '../models/user.model';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

const seed = async () => {
  await connectDB();
  await Role.deleteMany({});
  await User.deleteMany({});

  const reader = await Role.create({ role: 'READER', description: 'Default reader role', active: true });
  const editor = await Role.create({ role: 'EDITOR', description: 'Editor', active: true });
  const admin = await Role.create({ role: 'ADMIN', description: 'ADMIN', active: true });
  console.log('Roles created');

  const hash = await bcrypt.hash('adminpass', SALT_ROUNDS);
  console.log("Hashed password",hash);

  await User.create({
    username: 'admin',
    password: hash,
    firstname: 'Admin',
    lastname: 'User',
    email: 'admin@aueb.gr',
    roles: [reader._id, editor._id, admin._id]
  });

  console.log('Seed finished');
  process.exit(0);
};

seed().catch(e => { console.error(e); process.exit(1); });
