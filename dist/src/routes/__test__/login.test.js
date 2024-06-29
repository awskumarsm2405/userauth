"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../app");
const supertest_1 = __importDefault(require("supertest"));
it("respond with detail about current user", () => __awaiter(void 0, void 0, void 0, function* () {
    const access_token = yield global.signin();
    console.log("access_token", access_token);
    const response = yield (0, supertest_1.default)(app_1.app)
        .get('/auth/currentuser')
        .set('access_token', access_token)
        .send()
        .expect(200);
    expect(response.body.currentUser.email).toEqual('test@test.com');
}), 70 * 1000);
const email = 'test@test.com';
const password = 'password';
it("login with vaild user and pasword", () => __awaiter(void 0, void 0, void 0, function* () {
    const access_token = yield global.signin();
    const response = yield (0, supertest_1.default)(app_1.app)
        .post('/auth/signin')
        .send({
        email,
        password
    })
        .expect(200);
    expect(response.body.user_id).not.toEqual('');
}), 70 * 1000);
it("login with vaild user and invaild pasword", () => __awaiter(void 0, void 0, void 0, function* () {
    const access_token = yield global.signin();
    const response = yield (0, supertest_1.default)(app_1.app)
        .post('/auth/signin')
        .send({
        email,
        password: "12345"
    })
        .expect(400);
}), 70 * 1000);
it("login with invaild user and vaild pasword", () => __awaiter(void 0, void 0, void 0, function* () {
    const access_token = yield global.signin();
    const response = yield (0, supertest_1.default)(app_1.app)
        .post('/auth/signin')
        .send({
        email: "",
        password
    })
        .expect(400);
}), 70 * 1000);
