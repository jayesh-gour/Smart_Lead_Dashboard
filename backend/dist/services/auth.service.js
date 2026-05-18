"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const ApiError_1 = require("../utils/ApiError");
const env_1 = require("../config/env");
const SALT_ROUNDS = 10;
const signToken = (user) => {
    const payload = {
        userId: user._id.toString(),
        role: user.role,
    };
    return jsonwebtoken_1.default.sign(payload, env_1.env.JWT_SECRET, {
        expiresIn: env_1.env.JWT_EXPIRES_IN,
    });
};
const publicUser = (user) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
});
const registerUser = async (input) => {
    const existing = await User_1.User.findOne({ email: input.email });
    if (existing) {
        throw new ApiError_1.ApiError(409, 'Email is already registered');
    }
    const hashed = await bcryptjs_1.default.hash(input.password, SALT_ROUNDS);
    // Public sign-up is always Sales; use seed or DB for Admin accounts
    const role = 'Sales';
    const user = await User_1.User.create({
        name: input.name,
        email: input.email,
        password: hashed,
        role,
    });
    const token = signToken(user);
    return { user: publicUser(user), token };
};
exports.registerUser = registerUser;
const loginUser = async (input) => {
    const user = await User_1.User.findOne({ email: input.email }).select('+password');
    if (!user) {
        throw new ApiError_1.ApiError(401, 'Invalid email or password');
    }
    const match = await bcryptjs_1.default.compare(input.password, user.password);
    if (!match) {
        throw new ApiError_1.ApiError(401, 'Invalid email or password');
    }
    const token = signToken(user);
    return { user: publicUser(user), token };
};
exports.loginUser = loginUser;
const getProfile = async (userId) => {
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new ApiError_1.ApiError(404, 'User not found');
    }
    return publicUser(user);
};
exports.getProfile = getProfile;
//# sourceMappingURL=auth.service.js.map