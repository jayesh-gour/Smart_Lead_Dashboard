import { Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import { AuthRequest } from '../middleware/auth';
import * as authService from '../services/auth.service';

export const register = asyncHandler(async (req, res: Response) => {
  const result = await authService.registerUser(req.body);
  sendSuccess(res, 'Account created', result, 201);
});

export const login = asyncHandler(async (req, res: Response) => {
  const result = await authService.loginUser(req.body);
  sendSuccess(res, 'Logged in successfully', result);
});

export const me = asyncHandler(async (req: AuthRequest, res: Response) => {
  const profile = await authService.getProfile(req.user!.id);
  sendSuccess(res, 'Profile fetched', profile);
});
