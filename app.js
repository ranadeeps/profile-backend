"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const error_1 = require("./utils/error");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const router_1 = __importDefault(require("./analytics/router"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("combined", { stream: process.stdout }));
app.get("/", (req, res, next) => res.status(http_status_codes_1.default.OK).send("thanks for visiting"));
app.use(express_1.default.json());
app.set("trust proxy", true);
app.use("/analytics", router_1.default);
app.use((error, req, res, next) => {
    if (error instanceof error_1.apiError) {
        res
            .status(typeof error.code == "number" ? error.code : http_status_codes_1.default.BAD_REQUEST)
            .send({ code: error.code, message: error.message });
    }
    else if (error instanceof error_1.authenticationError) {
        res
            .status(http_status_codes_1.default.UNAUTHORIZED)
            .send({ code: http_status_codes_1.default.UNAUTHORIZED, message: error.message });
    }
    else {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send({
            code: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map