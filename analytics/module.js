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
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_log = void 0;
const uuid_1 = require("uuid");
const database_1 = require("../database");
const log_model_1 = require("./log.model");
const create_log = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uuid = (0, uuid_1.v4)();
        const created_log = yield database_1.typeorm.manager.save(log_model_1.Log, {
            ip: req.ips[0] || req.ip,
            uuid,
        });
        return created_log;
    }
    catch (error) {
        throw error;
    }
});
exports.create_log = create_log;
//# sourceMappingURL=module.js.map