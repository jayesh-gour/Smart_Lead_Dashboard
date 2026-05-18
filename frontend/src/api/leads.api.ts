import { api } from './client';
import { ApiResponse, Lead, LeadFilters, LeadStats } from '@/types';

export interface LeadFormData {
  name: string;
  email: string;
  status?: string;
  source: string;
}

export const leadsApi = {
  stats: () => api.get<ApiResponse<LeadStats>>('/leads/stats'),

  list: (filters: Partial<LeadFilters>) =>
    api.get<ApiResponse<Lead[]>>('/leads', { params: filters }),

  getById: (id: string) => api.get<ApiResponse<Lead>>(`/leads/${id}`),

  create: (body: LeadFormData) =>
    api.post<ApiResponse<Lead>>('/leads', body),

  update: (id: string, body: Partial<LeadFormData>) =>
    api.patch<ApiResponse<Lead>>(`/leads/${id}`, body),

  remove: (id: string) => api.delete<ApiResponse<null>>(`/leads/${id}`),

  exportCsv: (filters: Partial<LeadFilters>) =>
    api.get('/leads/export/csv', {
      params: filters,
      responseType: 'blob',
    }),
};
