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
const auth_1 = __importDefault(require("../../util/auth"));
const definition_1 = require("./definition");
const prisma = new client_1.PrismaClient();
const login = (login) => __awaiter(void 0, void 0, void 0, function* () {
    if (!login) {
        throw Error('login request not found.');
    }
    try {
        const foundUser = yield prisma.user.findFirstOrThrow({
            where: {
                username: login.username,
            },
        });
        if (!foundUser) {
            throw Error('user not found');
        }
        if (!auth_1.default.comparePassword(login.password, foundUser.password)) {
            throw Error('invalid password');
        }
        return new definition_1.UserView(foundUser);
    }
    catch (err) {
        throw err;
    }
});
exports.default = Object.freeze({
    login
});
