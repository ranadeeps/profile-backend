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
exports.get_log_details = exports.create_log = void 0;
const uuid_1 = require("uuid");
const database_1 = require("../database");
const log_model_1 = require("./log.model");
const moment_1 = __importDefault(require("moment"));
const create_log = (req, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existing_log = yield database_1.typeorm.manager.findOne(log_model_1.Log, {
            where: { uuid: query.referenceId },
        });
        if (existing_log &&
            Math.abs((0, moment_1.default)(new Date()).diff(existing_log.updatedAt, "hour")) <= 1) {
            const updated_log = yield database_1.typeorm.manager.update(log_model_1.Log, { id: existing_log.id }, { updatedAt: new Date() });
            return yield database_1.typeorm.manager.findOne(log_model_1.Log, {
                where: { uuid: query.referenceId },
            });
        }
        else {
            const splitted_ip = req.ips[0].split(".");
            if (splitted_ip[0] == "122" && splitted_ip[1] == "177") {
                return null;
            }
            const uuid = (0, uuid_1.v4)();
            const created_log = yield database_1.typeorm.manager.save(log_model_1.Log, {
                ip: req.ips[0] || req.ip,
                uuid,
            });
            return created_log;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.create_log = create_log;
const get_log_details = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield database_1.typeorm.manager.count(log_model_1.Log);
    const lastFiveLogs = yield database_1.typeorm.manager.find(log_model_1.Log, {
        order: { createdAt: "DESC" },
        take: 5,
    });
    let res_html = `<p>Total count: ${count}</p><br/>`;
    for (let i = 0; i < lastFiveLogs.length; i++) {
        res_html += `${lastFiveLogs[i].ip} - ${lastFiveLogs[i].uuid} - ${lastFiveLogs[i].createdAt.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
        })} <br/>`;
    }
    return res_html;
});
exports.get_log_details = get_log_details;
//# sourceMappingURL=module.js.map