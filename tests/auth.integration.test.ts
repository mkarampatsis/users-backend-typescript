import { TestServer } from './testSetup';
import userRouter from '../src/routes/user.routes';
import { createUser } from '../src/services/user.service';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../src/config';

const server = new TestServer();
server.app.use('/users', userRouter);

describe('🔐 Authentication Tests', () => {
  beforeAll(async () => { await server.start(); });
  afterAll(async () => { await server.stop(); });

  test('POST /users/login -> επιτυχής είσοδος', async () => {
    const user = await createUser({ username: 'tester', password: 'pass123' });
    const res = await server.request.post('/users/login').send({ username: 'tester', password: 'pass123' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    const decoded = jwt.verify(res.body.token, JWT_SECRET) as any;
    expect(decoded.username).toBe('tester');
  });

  test('POST /users/login -> αποτυχία με λάθος κωδικό', async () => {
    await createUser({ username: 'wronguser', password: '1234' });
    const res = await server.request.post('/users/login').send({ username: 'wronguser', password: 'badpass' });
    expect(res.status).toBe(401);
  });
});
