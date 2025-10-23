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
const app_1 = __importDefault(require("./app"));
const database_1 = require("./database");
require("reflect-metadata");
const port = process.env.port || 8001;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connect_database)();
}))();
app_1.default.listen(port, (error) => __awaiter(void 0, void 0, void 0, function* () {
    if (error)
        console.log(`Error while starting express server ${error.message}`);
    console.log(`Server started on port ${port}`);
}));
//# sourceMappingURL=main.js.map