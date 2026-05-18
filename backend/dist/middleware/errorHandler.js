"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = require("../utils/ApiError");
const apiResponse_1 = require("../utils/apiResponse");
const env_1 = require("../config/env");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof ApiError_1.ApiError) {
        (0, apiResponse_1.sendError)(res, err.statusCode, err.message, err.errors);
        return;
    }
    if (err instanceof mongoose_1.default.Error.CastError) {
        (0, apiResponse_1.sendError)(res, 400, 'Invalid resource id');
        return;
    }
    if (err.code === 11000) {
        (0, apiResponse_1.sendError)(res, 409, 'Duplicate value — record already exists');
        return;
    }
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e) => e.message);
        (0, apiResponse_1.sendError)(res, 400, 'Validation error', messages);
        return;
    }
    console.error(err);
    const message = env_1.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message;
    (0, apiResponse_1.sendError)(res, 500, message);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map