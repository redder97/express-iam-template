"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../config"));
const saltRounds = config_1.default.SALT_ROUNDS;
const hashPassword = (plaintext) => {
    const salt = bcryptjs_1.default.genSaltSync(parseInt(saltRounds));
    console.log(salt);
    return bcryptjs_1.default.hashSync(plaintext, parseInt(salt));
};
const comparePassword = (plaintext, hash) => {
    return bcryptjs_1.default.compareSync(plaintext, hash);
};
exports.default = Object.freeze({
    hashPassword,
    comparePassword
});
