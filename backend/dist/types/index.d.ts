export type UserRole = 'Admin' | 'Sales';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export declare const LEAD_STATUSES: LeadStatus[];
export type LeadSource = 'Website' | 'Instagram' | 'Referral';
export type SortOrder = 'latest' | 'oldest';
export interface JwtPayload {
    userId: string;
    role: UserRole;
}
export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
}
export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    meta?: PaginationMeta;
}
export interface LeadQueryParams {
    page?: number;
    status?: LeadStatus;
    source?: LeadSource;
    search?: string;
    sort?: SortOrder;
}
//# sourceMappingURL=index.d.ts.map