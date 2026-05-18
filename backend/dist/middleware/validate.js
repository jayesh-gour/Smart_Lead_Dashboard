"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const ApiError_1 = require("../utils/ApiError");
const validate = (schema, target = 'body') => (req, _res, next) => {
    try {
        const parsed = schema.parse(req[target]);
        req[target] = parsed;
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            const messages = err.errors.map((e) => e.message);
            next(new ApiError_1.ApiError(400, 'Validation failed', messages));
            return;
        }
        next(err);
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map