"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, message, data, statusCode = 200, meta) => {
    const body = { success: true, message };
    if (data !== undefined)
        body.data = data;
    if (meta)
        body.meta = meta;
    return res.status(statusCode).json(body);
};
exports.sendSuccess = sendSuccess;
const sendError = (res, statusCode, message, errors) => {
    const body = { success: false, message };
    if (errors?.length) {
        return res.status(statusCode).json({ ...body, errors });
    }
    return res.status(statusCode).json(body);
};
exports.sendError = sendError;
//# sourceMappingURL=apiResponse.js.map