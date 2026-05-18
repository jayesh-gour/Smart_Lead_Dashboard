"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLeadQuery = void 0;
const DEFAULT_LIMIT = 10;
const parseLeadQuery = (query) => {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = DEFAULT_LIMIT;
    const skip = (page - 1) * limit;
    const filter = {};
    if (query.status) {
        filter.status = query.status;
    }
    if (query.source) {
        filter.source = query.source;
    }
    if (query.search?.trim()) {
        const term = query.search.trim();
        const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        filter.$or = [{ name: regex }, { email: regex }];
    }
    const sortDir = query.sort === 'oldest' ? 1 : -1;
    return {
        filter,
        sort: { createdAt: sortDir },
        skip,
        limit,
        page,
    };
};
exports.parseLeadQuery = parseLeadQuery;
//# sourceMappingURL=leadQuery.js.map