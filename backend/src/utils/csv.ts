import { ILead } from '../models/Lead';

const escapeCell = (value: string): string => {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

export const leadsToCsv = (leads: ILead[]): string => {
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
