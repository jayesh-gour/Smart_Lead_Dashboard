import { Lead, ILead } from '../models/Lead';
import { ApiError } from '../utils/ApiError';
import { parseLeadQuery } from '../utils/leadQuery';
import { leadsToCsv } from '../utils/csv';
import { LeadQueryParams, LeadStatus, LEAD_STATUSES, PaginationMeta, UserRole } from '../types';
import { CreateLeadInput, UpdateLeadInput } from '../validators/lead.validator';

const toLeadResponse = (lead: ILead) => ({
  id: lead._id,
  name: lead.name,
  email: lead.email,
  status: lead.status,
  source: lead.source,
  createdBy: lead.createdBy,
  createdAt: lead.createdAt,
  updatedAt: lead.updatedAt,
});

const assertLeadAccess = (lead: ILead, userId: string, role: UserRole): void => {
  if (role === 'Admin') return;
  if (lead.createdBy.toString() !== userId) {
    throw new ApiError(403, 'You can only manage leads you created');
  }
};

export const createLead = async (
  input: CreateLeadInput,
  userId: string
) => {
  const lead = await Lead.create({
    ...input,
    status: input.status ?? 'New',
    createdBy: userId,
  });
  return toLeadResponse(lead);
};

export const getLeads = async (
  query: LeadQueryParams,
  userId: string,
  role: UserRole
) => {
  const parsed = parseLeadQuery(query);
  const filter = { ...parsed.filter };

  if (role !== 'Admin') {
    filter.createdBy = userId;
  }

  const [items, totalItems] = await Promise.all([
    Lead.find(filter).sort(parsed.sort).skip(parsed.skip).limit(parsed.limit),
    Lead.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalItems / parsed.limit) || 1;
  const meta: PaginationMeta = {
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

export const getLeadById = async (
  id: string,
  userId: string,
  role: UserRole
) => {
  const lead = await Lead.findById(id);
  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }
  assertLeadAccess(lead, userId, role);
  return toLeadResponse(lead);
};

export const updateLead = async (
  id: string,
  input: UpdateLeadInput,
  userId: string,
  role: UserRole
) => {
  const lead = await Lead.findById(id);
  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }
  assertLeadAccess(lead, userId, role);

  Object.assign(lead, input);
  await lead.save();
  return toLeadResponse(lead);
};

export const deleteLead = async (
  id: string,
  userId: string,
  role: UserRole
) => {
  const lead = await Lead.findById(id);
  if (!lead) {
    throw new ApiError(404, 'Lead not found');
  }
  assertLeadAccess(lead, userId, role);
  await lead.deleteOne();
};

export const getLeadStats = async (userId: string, role: UserRole) => {
  const filter =
    role === 'Admin' ? {} : { createdBy: userId };

  const [groups, total] = await Promise.all([
    Lead.aggregate<{ _id: LeadStatus; count: number }>([
      { $match: filter },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Lead.countDocuments(filter),
  ]);

  const byStatus = LEAD_STATUSES.reduce(
    (acc, status) => {
      acc[status] = groups.find((g) => g._id === status)?.count ?? 0;
      return acc;
    },
    {} as Record<LeadStatus, number>
  );

  return { total, byStatus };
};

export const exportLeadsCsv = async (
  query: LeadQueryParams,
  userId: string,
  role: UserRole
) => {
  const parsed = parseLeadQuery({ ...query, page: 1 });
  const filter = { ...parsed.filter };

  if (role !== 'Admin') {
    filter.createdBy = userId;
  }

  const leads = await Lead.find(filter).sort(parsed.sort).limit(5000);
  return leadsToCsv(leads);
};
