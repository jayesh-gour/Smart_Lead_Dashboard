import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';
import { RegisterInput, LoginInput } from '../validators/auth.validator';
import { JwtPayload } from '../types';

const SALT_ROUNDS = 10;

const signToken = (user: IUser): string => {
  const payload: JwtPayload = {
    userId: user._id.toString(),
    role: user.role,
  };
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as jwt.SignOptions);
};

const publicUser = (user: IUser) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});

export const registerUser = async (input: RegisterInput) => {
  const existing = await User.findOne({ email: input.email });
  if (existing) {
    throw new ApiError(409, 'Email is already registered');
  }

  const hashed = await bcrypt.hash(input.password, SALT_ROUNDS);
  // Public sign-up is always Sales; use seed or DB for Admin accounts
  const role = 'Sales' as const;

  const user = await User.create({
    name: input.name,
    email: input.email,
    password: hashed,
    role,
  });

  const token = signToken(user);
  return { user: publicUser(user), token };
};

export const loginUser = async (input: LoginInput) => {
  const user = await User.findOne({ email: input.email }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const match = await bcrypt.compare(input.password, user.password);
  if (!match) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = signToken(user);
  return { user: publicUser(user), token };
};

export const getProfile = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return publicUser(user);
};
