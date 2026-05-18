"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportLeadsCsv = exports.getLeadStats = exports.deleteLead = exports.updateLead = exports.getLeadById = exports.getLeads = exports.createLead = void 0;
const Lead_1 = require("../models/Lead");
const ApiError_1 = require("../utils/ApiError");
const leadQuery_1 = require("../utils/leadQuery");
const csv_1 = require("../utils/csv");
const types_1 = require("../types");
const toLeadResponse = (lead) => ({
    id: lead._id,
    name: lead.name,
    email: lead.email,
    status: lead.status,
    source: lead.source,
    createdBy: lead.createdBy,
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
});
const assertLeadAccess = (lead, userId, role) => {
    if (role === 'Admin')
        return;
    if (lead.createdBy.toString() !== userId) {
        throw new ApiError_1.ApiError(403, 'You can only manage leads you created');
    }
};
const createLead = async (input, userId) => {
    const lead = await Lead_1.Lead.create({
        ...input,
        status: input.status ?? 'New',
        createdBy: userId,
    });
    return toLeadResponse(lead);
};
exports.createLead = createLead;
const getLeads = async (query, userId, role) => {
    const parsed = (0, leadQuery_1.parseLeadQuery)(query);
    const filter = { ...parsed.filter };
    if (role !== 'Admin') {
        filter.createdBy = userId;
    }
    const [items, totalItems] = await Promise.all([
        Lead_1.Lead.find(filter).sort(parsed.sort).skip(parsed.skip).limit(parsed.limit),
        Lead_1.Lead.countDocuments(filter),
    ]);
    const totalPages = Math.ceil(totalItems / parsed.limit) || 1;
    const meta = {
        currentPage: parsed.page,
        totalPages,
        totalItems,
        limit: parsed.limit,
    };
    return {
        leads: items.map(toLeadResponse),
        meta,
    };
};
exports.getLeads = getLeads;
const getLeadById = async (id, userId, role) => {
    const lead = await Lead_1.Lead.findById(id);
    if (!lead) {
        throw new ApiError_1.ApiError(404, 'Lead not found');
    }
    assertLeadAccess(lead, userId, role);
    return toLeadResponse(lead);
};
exports.getLeadById = getLeadById;
const updateLead = async (id, input, userId, role) => {
    const lead = await Lead_1.Lead.findById(id);
    if (!lead) {
        throw new ApiError_1.ApiError(404, 'Lead not found');
    }
    assertLeadAccess(lead, userId, role);
    Object.assign(lead, input);
    await lead.save();
    return toLeadResponse(lead);
};
exports.updateLead = updateLead;
const deleteLead = async (id, userId, role) => {
    const lead = await Lead_1.Lead.findById(id);
    if (!lead) {
        throw new ApiError_1.ApiError(404, 'Lead not found');
    }
    assertLeadAccess(lead, userId, role);
    await lead.deleteOne();
};
exports.deleteLead = deleteLead;
const getLeadStats = async (userId, role) => {
    const filter = role === 'Admin' ? {} : { createdBy: userId };
    const [groups, total] = await Promise.all([
        Lead_1.Lead.aggregate([
            { $match: filter },
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]),
        Lead_1.Lead.countDocuments(filter),
    ]);
    const byStatus = types_1.LEAD_STATUSES.reduce((acc, status) => {
        acc[status] = groups.find((g) => g._id === status)?.count ?? 0;
        return acc;
    }, {});
    return { total, byStatus };
};
exports.getLeadStats = getLeadStats;
const exportLeadsCsv = async (query, userId, role) => {
    const parsed = (0, leadQuery_1.parseLeadQuery)({ ...query, page: 1 });
    const filter = { ...parsed.filter };
    if (role !== 'Admin') {
        filter.createdBy = userId;
    }
    const leads = await Lead_1.Lead.find(filter).sort(parsed.sort).limit(5000);
    return (0, csv_1.leadsToCsv)(leads);
};
exports.exportLeadsCsv = exportLeadsCsv;
//# sourceMappingURL=lead.service.js.map