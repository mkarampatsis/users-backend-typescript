import { TestServer } from './testSetup';
import authRouter from '../routes/auth.routes';
import { createUser } from '../services/user.service';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'test_secret';;

const server = new TestServer();
server.app.use('/auth', authRouter);

describe('Authentication Tests', () => {
  beforeAll(async () => { await server.start(); });
  afterAll(async () => { await server.stop(); });

  test('POST /auth/login -> επιτυχής είσοδος', async () => {
    const user = await createUser({ username: 'tester', password: 'pass123' });
    const res = await server.request.post('/auth/login').send({ username: 'tester', password: 'pass123' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    const decoded = jwt.verify(res.body.token, JWT_SECRET) as any;
    expect(decoded.username).toBe('tester');
  });

  test('POST /auth/login -> αποτυχία με λάθος κωδικό', async () => {
    await createUser({ username: 'wronguser', password: '1234' });
    const res = await server.request.post('/auth/login').send({ username: 'wronguser', password: 'badpass' });
    expect(res.status).toBe(401);
  });
});
