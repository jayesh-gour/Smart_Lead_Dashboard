import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types';
export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: UserRole;
    };
}
export declare const protect: (req: AuthRequest, _res: Response, next: NextFunction) => Promise<void>;
export declare const authorize: (...roles: UserRole[]) => (req: AuthRequest, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map