"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const ApiError_1 = require("../utils/ApiError");
const User_1 = require("../models/User");
const protect = async (req, _res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header?.startsWith('Bearer ')) {
            throw new ApiError_1.ApiError(401, 'Not authorized — token missing');
        }
        const token = header.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        const user = await User_1.User.findById(decoded.userId).select('_id role');
        if (!user) {
            throw new ApiError_1.ApiError(401, 'User no longer exists');
        }
        req.user = { id: user._id.toString(), role: user.role };
        next();
    }
    catch (err) {
        if (err instanceof ApiError_1.ApiError) {
            next(err);
            return;
        }
        next(new ApiError_1.ApiError(401, 'Invalid or expired token'));
    }
};
exports.protect = protect;
const authorize = (...roles) => {
    return (req, _res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            next(new ApiError_1.ApiError(403, 'You do not have permission for this action'));
            return;
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map