"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testSetup_1 = require("./testSetup");
const user_routes_1 = __importDefault(require("../src/routes/user.routes"));
const user_model_1 = __importDefault(require("../src/models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'test_secret';
;
const server = new testSetup_1.TestServer();
server.app.use('/users', user_routes_1.default);
describe('👤 User API Tests', () => {
    let token;
    beforeAll(async () => {
        await server.start();
        const hash = await bcrypt_1.default.hash('admin123', 10);
        const user = await user_model_1.default.create({ username: 'admin', password: hash, roles: [] });
        token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
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
            .send({ username: 'newuser', password: '123456' });
        expect(res.status).toBe(201);
        expect(res.body.username).toBe('newuser');
    });
});
