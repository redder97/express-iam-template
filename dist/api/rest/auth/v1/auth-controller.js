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
const express_1 = __importDefault(require("express"));
const auth_service_1 = __importDefault(require("../../../../service/auth/auth-service"));
const router = express_1.default.Router();
router.post('/v1/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginRequest = req.body;
        const result = yield auth_service_1.default.login(loginRequest);
        return res.json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}));
router.use((err, req, res, next) => {
    const caughtResponse = {
        success: false,
        message: err.message,
    };
    return res.json(caughtResponse);
});
exports.default = router;
