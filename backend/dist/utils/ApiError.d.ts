export declare class ApiError extends Error {
    statusCode: number;
    errors?: string[];
    constructor(statusCode: number, message: string, errors?: string[]);
}
//# sourceMappingURL=ApiError.d.ts.map