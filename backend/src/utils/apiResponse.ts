import { Response } from 'express';
import { ApiResponse, PaginationMeta } from '../types';

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200,
  meta?: PaginationMeta
): Response => {
  const body: ApiResponse<T> = { success: true, message };
  if (data !== undefined) body.data = data;
  if (meta) body.meta = meta;
  return res.status(statusCode).json(body);
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: string[]
): Response => {
  const body: ApiResponse = { success: false, message };
  if (errors?.length) {
    return res.status(statusCode).json({ ...body, errors });
  }
  return res.status(statusCode).json(body);
};
