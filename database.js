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
exports.typeorm = void 0;
exports.connect_database = connect_database;
const typeorm_1 = require("typeorm");
const log_model_1 = require("./analytics/log.model");
const db_username = process.env.db_username;
const db_password = process.env.db_password;
const db_name = process.env.db_name;
const db_port = process.env.db_port;
const db_host = process.env.db_host;
exports.typeorm = new typeorm_1.DataSource({
    type: "postgres",
    host: db_host,
    port: Number(db_port),
    username: db_username,
    password: db_password,
    database: db_name,
    synchronize: true,
    logging: true,
    entities: [log_model_1.Log],
    subscribers: [],
    migrations: [],
    metadataTableName: "metadata",
});
function connect_database() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.typeorm.initialize();
            console.log("Connect to database");
        }
        catch (error) {
            console.log(error);
        }
    });
}
//# sourceMappingURL=database.js.map