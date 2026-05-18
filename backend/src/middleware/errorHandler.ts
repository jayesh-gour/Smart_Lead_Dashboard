import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError';
import { sendError } from '../utils/apiResponse';
import { env } from '../config/env';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ApiError) {
    sendError(res, err.statusCode, err.message, err.errors);
    return;
  }

  if (err instanceof mongoose.Error.CastError) {
    sendError(res, 400, 'Invalid resource id');
    return;
  }

  if ((err as mongoose.Error & { code?: number }).code === 11000) {
    sendError(res, 409, 'Duplicate value — record already exists');
    return;
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values((err as mongoose.Error.ValidationError).errors).map(
      (e) => e.message
    );
    sendError(res, 400, 'Validation error', messages);
    return;
  }

  console.error(err);
  const message =
    env.NODE_ENV === 'production' ? 'Something went wrong' : err.message;
  sendError(res, 500, message);
};
