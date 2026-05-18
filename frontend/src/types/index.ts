export type UserRole = 'Admin' | 'Sales';

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';

export type LeadSource = 'Website' | 'Instagram' | 'Referral';

export type SortOrder = 'latest' | 'oldest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
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
  errors?: string[];
}

export interface AuthPayload {
  user: User;
  token: string;
}

export interface LeadStats {
  total: number;
  byStatus: Record<LeadStatus, number>;
}

export interface LeadFilters {
  page: number;
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort: SortOrder;
}
