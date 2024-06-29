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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const common_1 = require("@skmnpm/common");
const signin_1 = require("./routes/signin");
const signup_1 = require("./routes/signup");
const cookie_session_1 = __importDefault(require("cookie-session"));
const currentuser_1 = require("./routes/currentuser");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, body_parser_1.default)());
app.use((req, res, next) => {
    next();
}, (0, cors_1.default)({ maxAge: 84600 }));
app.use((0, cookie_session_1.default)({
    name: 'session',
    signed: false,
    secure: false
}));
app.use("/auth", signin_1.signinRoute);
app.use("/auth", signup_1.signupRoute);
app.use("/auth", currentuser_1.currentUser);
app.all("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new common_1.NotFoundError("Invalid Request");
}));
app.use(common_1.errorhandler);
