import request from 'supertest';
import app from '../app';
import { connectDB } from '../utils/db';

beforeAll(async () => {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI not set; skipping tests.');
    return;
  }
  await connectDB();
});

describe('Auth endpoints', () => {
  it('register -> login flow', async () => {
    const username = 'testuser' + Date.now();
    const reg = await request(app).post('/api/auth/register').send({ username, password: 'password123' });
    expect([201,200]).toContain(reg.status);
    const login = await request(app).post('/api/auth/login').send({ username, password: 'password123' });
    expect([200,201]).toContain(login.status);
    expect(login.body).toHaveProperty('token');
  });
});
