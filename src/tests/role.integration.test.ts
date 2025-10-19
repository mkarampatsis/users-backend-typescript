import { TestServer } from './testSetup';
import roleRouter from '../routes/role.routes';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'test_secret';;

const server = new TestServer();
server.app.use('/roles', roleRouter);

describe('Role API Tests', () => {
  let token: string;

  beforeAll(async () => {
    await server.start();
    const hash = await bcrypt.hash('admin123', 10);
    const user = await User.create({ username: 'admin', password: hash, roles: [] });
    token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => { await server.stop(); });

  test('POST /roles -> δημιουργεί ρόλο', async () => {
    const res = await server.request.post('/roles')
      .set('Authorization', `Bearer ${token}`)
      .send({ role: 'EDITOR', description: 'Can edit content' });
    expect(res.status).toBe(201);
    expect(res.body.role).toBe('EDITOR');
  });

  test('GET /roles -> επιστρέφει λίστα ρόλων', async () => {
    const res = await server.request.get('/roles').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
