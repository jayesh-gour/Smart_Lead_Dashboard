"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadsToCsv = void 0;
const escapeCell = (value) => {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
};
const leadsToCsv = (leads) => {
    const headers = ['Name', 'Email', 'Status', 'Source', 'Created At'];
    const rows = leads.map((lead) => {
        const created = lead.createdAt
            ? new Date(lead.createdAt).toISOString()
            : '';
        return [
            escapeCell(lead.name),
            escapeCell(lead.email),
            escapeCell(lead.status),
            escapeCell(lead.source),
            escapeCell(created),
        ].join(',');
    });
    return [headers.join(','), ...rows].join('\n');
};
exports.leadsToCsv = leadsToCsv;
//# sourceMappingURL=csv.js.map