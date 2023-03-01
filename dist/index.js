"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const npmlog_1 = __importDefault(require("npmlog"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_controller_1 = __importDefault(require("./api/rest/auth/v1/auth-controller"));
const register_controller_1 = __importDefault(require("./api/rest/registration/v1/register-controller"));
const config_1 = __importDefault(require("./config"));
const PORT = config_1.default.PORT;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api', auth_controller_1.default);
app.use('/api', register_controller_1.default);
app.listen(PORT, () => {
    npmlog_1.default.info(``, `IAM server started at port ${PORT}`);
});
