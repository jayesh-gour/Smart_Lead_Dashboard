import { RegisterInput, LoginInput } from '../validators/auth.validator';
export declare const registerUser: (input: RegisterInput) => Promise<{
    user: {
        id: string;
        name: string;
        email: string;
        role: import("../types").UserRole;
        createdAt: Date;
    };
    token: string;
}>;
export declare const loginUser: (input: LoginInput) => Promise<{
    user: {
        id: string;
        name: string;
        email: string;
        role: import("../types").UserRole;
        createdAt: Date;
    };
    token: string;
}>;
export declare const getProfile: (userId: string) => Promise<{
    id: string;
    name: string;
    email: string;
    role: import("../types").UserRole;
    createdAt: Date;
}>;
//# sourceMappingURL=auth.service.d.ts.map