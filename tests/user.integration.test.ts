import { TestServer } from './testSetup';
import userRouter from '../src/routes/user.routes';
import User from '../src/models/user.model';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../src/config';
import bcrypt from 'bcrypt';

const server = new TestServer();
server.app.use('/users', userRouter);

describe('👤 User API Tests', () => {
  let token: string;

  beforeAll(async () => {
    await server.start();
    const hash = await bcrypt.hash('admin123', 10);
    const user = await User.create({ username: 'admin', password: hash, roles: [] });
    token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => { await server.stop(); });

  test('GET /users -> επιστρέφει λίστα χρηστών', async () => {
    const res = await server.request.get('/users').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /users -> δημιουργεί νέο χρήστη', async () => {
    const res = await server.request.post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'newuser', password: '12345' });
    expect(res.status).toBe(201);
    expect(res.body.username).toBe('newuser');
  });
});
