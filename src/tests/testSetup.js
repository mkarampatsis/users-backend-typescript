"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestServer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
class TestServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(body_parser_1.default.json());
        this.request = (0, supertest_1.default)(this.app);
    }
    async start() {
        this.mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = this.mongoServer.getUri();
        await mongoose_1.default.connect(uri);
    }
    async stop() {
        await mongoose_1.default.disconnect();
        if (this.mongoServer)
            await this.mongoServer.stop();
    }
    async cleanup() {
        const collections = mongoose_1.default.connection.collections;
        for (const key in collections) {
            await collections[key].deleteMany({});
        }
    }
}
exports.TestServer = TestServer;
