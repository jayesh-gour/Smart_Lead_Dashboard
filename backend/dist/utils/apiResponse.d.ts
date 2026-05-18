import { Response } from 'express';
import { PaginationMeta } from '../types';
export declare const sendSuccess: <T>(res: Response, message: string, data?: T, statusCode?: number, meta?: PaginationMeta) => Response;
export declare const sendError: (res: Response, statusCode: number, message: string, errors?: string[]) => Response;
//# sourceMappingURL=apiResponse.d.ts.map