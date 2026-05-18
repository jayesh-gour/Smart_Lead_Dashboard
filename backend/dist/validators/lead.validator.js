"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadListQuerySchema = exports.updateLeadSchema = exports.createLeadSchema = void 0;
const zod_1 = require("zod");
const leadStatus = zod_1.z.enum(['New', 'Contacted', 'Qualified', 'Lost']);
const leadSource = zod_1.z.enum(['Website', 'Instagram', 'Referral']);
exports.createLeadSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    email: zod_1.z.string().email(),
    status: leadStatus.optional(),
    source: leadSource,
});
exports.updateLeadSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(2).max(100).optional(),
    email: zod_1.z.string().email().optional(),
    status: leadStatus.optional(),
    source: leadSource.optional(),
})
    .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required to update',
});
exports.leadListQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().optional(),
    status: leadStatus.optional(),
    source: leadSource.optional(),
    search: zod_1.z.string().max(120).optional(),
    sort: zod_1.z.enum(['latest', 'oldest']).optional(),
});
//# sourceMappingURL=lead.validator.js.map