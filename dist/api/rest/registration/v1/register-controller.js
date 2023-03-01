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
const npmlog_1 = __importDefault(require("npmlog"));
const registration_service_1 = __importDefault(require("../../../../service/registration/registration-service"));
const router = express_1.default.Router();
router.post(`/v1/register`, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const registration = req.body;
    if (!registration) {
        next(Error('registration request error'));
    }
    try {
        const result = yield registration_service_1.default.register(registration);
        const response = {
            data: result,
            message: 'registration successful',
            success: true,
        };
        return res.json(response);
    }
    catch (err) {
        npmlog_1.default.error(``, err);
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
