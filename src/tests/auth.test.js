"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const db_1 = require("../src/utils/db");
beforeAll(async () => {
    if (!process.env.MONGO_URI) {
        console.warn('MONGO_URI not set; skipping tests.');
        return;
    }
    await (0, db_1.connectDB)();
});
describe('Auth endpoints', () => {
    it('register -> login flow', async () => {
        const username = 'testuser' + Date.now();
        const reg = await (0, supertest_1.default)(app_1.default).post('/api/auth/register').send({ username, password: 'password123' });
        expect([201, 200]).toContain(reg.status);
        const login = await (0, supertest_1.default)(app_1.default).post('/api/auth/login').send({ username, password: 'password123' });
        expect([200, 201]).toContain(login.status);
        expect(login.body).toHaveProperty('token');
    });
});
