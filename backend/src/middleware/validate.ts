import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiError } from '../utils/ApiError';

type RequestTarget = 'body' | 'query' | 'params';

export const validate =
  (schema: ZodSchema, target: RequestTarget = 'body') =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req[target]);
      req[target] = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const messages = err.errors.map((e) => e.message);
        next(new ApiError(400, 'Validation failed', messages));
        return;
      }
      next(err);
    }
  };
