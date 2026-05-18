import { FilterQuery, SortOrder as MongoSort } from 'mongoose';
import { ILead } from '../models/Lead';
import { LeadQueryParams } from '../types';

const DEFAULT_LIMIT = 10;

export interface ParsedLeadQuery {
  filter: FilterQuery<ILead>;
  sort: Record<string, MongoSort>;
  skip: number;
  limit: number;
  page: number;
}

export const parseLeadQuery = (query: LeadQueryParams): ParsedLeadQuery => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = DEFAULT_LIMIT;
  const skip = (page - 1) * limit;

  const filter: FilterQuery<ILead> = {};

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

  const sortDir: MongoSort = query.sort === 'oldest' ? 1 : -1;

  return {
    filter,
    sort: { createdAt: sortDir },
    skip,
    limit,
    page,
  };
};
