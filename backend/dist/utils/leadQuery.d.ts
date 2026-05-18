import { FilterQuery, SortOrder as MongoSort } from 'mongoose';
import { ILead } from '../models/Lead';
import { LeadQueryParams } from '../types';
export interface ParsedLeadQuery {
    filter: FilterQuery<ILead>;
    sort: Record<string, MongoSort>;
    skip: number;
    limit: number;
    page: number;
}
export declare const parseLeadQuery: (query: LeadQueryParams) => ParsedLeadQuery;
//# sourceMappingURL=leadQuery.d.ts.map