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
const client_1 = require("@prisma/client");
const npmlog_1 = __importDefault(require("npmlog"));
const auth_1 = __importDefault(require("../../util/auth"));
const prisma = new client_1.PrismaClient();
const register = (registration) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma.user.findFirst({
        where: {
            OR: [
                {
                    username: registration.username,
                },
                {
                    email: registration.email,
                },
            ],
        },
    });
    if (existingUser) {
        throw Error('username or email already exists!');
    }
    try {
        const createdUser = yield prisma.user.create({
            data: Object.assign(Object.assign({}, registration), { password: auth_1.default.hashPassword(registration.password) }),
        });
        return createdUser;
    }
    catch (err) {
        npmlog_1.default.error(`DB`, err);
        npmlog_1.default.error(`DB`, `Failed to create user`);
        throw err;
    }
});
exports.default = Object.freeze({
    register,
});
