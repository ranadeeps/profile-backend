"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationError = exports.apiError = void 0;
class apiError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.apiError = apiError;
class authenticationError extends apiError {
    constructor(message) {
        super(401, message);
    }
}
exports.authenticationError = authenticationError;
//# sourceMappingURL=error.js.map