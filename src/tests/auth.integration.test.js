"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testSetup_1 = require("./testSetup");
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const user_service_1 = require("../services/user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'test_secret';
;
const server = new testSetup_1.TestServer();
server.app.use('/auth', auth_routes_1.default);
describe('Authentication Tests', () => {
    beforeAll(async () => { await server.start(); });
    afterAll(async () => { await server.stop(); });
    test('POST /auth/login -> επιτυχής είσοδος', async () => {
        const user = await (0, user_service_1.createUser)({ username: 'tester', password: 'pass123' });
        const res = await server.request.post('/auth/login').send({ username: 'tester', password: 'pass123' });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        const decoded = jsonwebtoken_1.default.verify(res.body.token, JWT_SECRET);
        expect(decoded.username).toBe('tester');
    });
    test('POST /auth/login -> αποτυχία με λάθος κωδικό', async () => {
        await (0, user_service_1.createUser)({ username: 'wronguser', password: '1234' });
        const res = await server.request.post('/auth/login').send({ username: 'wronguser', password: 'badpass' });
        expect(res.status).toBe(401);
    });
});
