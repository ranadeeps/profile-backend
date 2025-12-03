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
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const module_1 = require("./module");
const router = express_1.default.Router();
router.get("/create-log", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(http_status_codes_1.default.CREATED).send(yield (0, module_1.create_log)(req, req.query));
    }
    catch (error) {
        next(error);
    }
}));
router.get("/get-log-details", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(http_status_codes_1.default.ACCEPTED).send(yield (0, module_1.get_log_details)());
    }
    catch (error) {
        next(error);
    }
}));
router.get("/get-visitor-count", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(http_status_codes_1.default.ACCEPTED).send(yield (0, module_1.get_visitor_count)());
    }
    catch (error) {
        next(error);
    }
}));
router.get("/leetcode", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, module_1.create_log)(req, req.query, "leetcode");
        res.redirect("https://ranadeepreddyshyamakura.info/");
    }
    catch (error) {
        next(error);
    }
}));
router.get("/linkedin", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, module_1.create_log)(req, req.query, "linkedin");
        res.redirect("https://ranadeepreddyshyamakura.info/");
    }
    catch (error) {
        next(error);
    }
}));
router.get("/instagram", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, module_1.create_log)(req, req.query, "instagram");
        res.redirect("https://ranadeepreddyshyamakura.info/");
    }
    catch (error) {
        next(error);
    }
}));
router.get("/monthly-data", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(http_status_codes_1.default.ACCEPTED).send(yield (0, module_1.get_monthly_data)());
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=router.js.map