import { connectDB } from '../utils/db';
import Role from '../models/role.model';
import User from '../models/user.model';
import dotenv from 'dotenv';
dotenv.config();

const seed = async () => {
  await connectDB();
  await Role.deleteMany({});
  await User.deleteMany({});

  const reader = await Role.create({ role: 'READER', description: 'Default reader role', active: true });
  const editor = await Role.create({ role: 'EDITOR', description: 'Editor', active: true });
  console.log('Roles created');

  await User.create({
    username: 'admin',
    password: 'adminpass',
    firstname: 'Admin',
    lastname: 'User',
    email: 'admin@aueb.gr',
    roles: [reader._id, editor._id]
  });

  console.log('Seed finished');
  process.exit(0);
};

seed().catch(e => { console.error(e); process.exit(1); });
