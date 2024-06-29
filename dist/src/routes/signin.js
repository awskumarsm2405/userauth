"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signinRoute = void 0;
const express_1 = __importDefault(require("express"));
const User_1 = require("./../models/User");
const express_validator_1 = require("express-validator");
const common_1 = require("@skmnpm/common");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const router = express_1.default.Router();
exports.signinRoute = router;
router.post('/signin', [
    (0, express_validator_1.body)('email').isEmail().notEmpty(),
    (0, express_validator_1.body)('password').isLength({ min: 5 })
], common_1.reqValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userObj = yield User_1.User.findOne({ "email": email });
    if (!userObj) {
        console.log("Invalid user credentials");
        throw new common_1.BadRequestError("Invalid user credentials");
    }
    const isMatched = yield bcryptjs_1.default.compare(password, userObj.password);
    if (!isMatched) {
        console.log("jjjInvalid user credentials");
        throw new common_1.BadRequestError("Invalid user credentials");
    }
    req.session = {
        jwt: jwt.sign({ email: userObj.email, id: userObj.id }, process.env.JWT_SECRET)
    };
    res.status(200).send({ "message": "Login successfull", "access_token": req.session.jwt, "user_id": userObj.id });
}));
