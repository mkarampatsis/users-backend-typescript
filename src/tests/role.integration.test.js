"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testSetup_1 = require("./testSetup");
const role_routes_1 = __importDefault(require("../src/routes/role.routes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../src/models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'test_secret';
;
const server = new testSetup_1.TestServer();
server.app.use('/roles', role_routes_1.default);
describe('Role API Tests', () => {
    let token;
    beforeAll(async () => {
        await server.start();
        const hash = await bcrypt_1.default.hash('admin123', 10);
        const user = await user_model_1.default.create({ username: 'admin', password: hash, roles: [] });
        token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
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
