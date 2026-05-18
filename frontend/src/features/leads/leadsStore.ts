import { create } from 'zustand';
import { Lead, LeadFilters, PaginationMeta } from '@/types';

interface LeadsState {
  leads: Lead[];
  meta: PaginationMeta | null;
  filters: LeadFilters;
  loading: boolean;
  error: string | null;
  setLeads: (leads: Lead[], meta: PaginationMeta) => void;
  setFilters: (patch: Partial<LeadFilters>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const defaultFilters: LeadFilters = {
  page: 1,
  sort: 'latest',
};

export const useLeadsStore = create<LeadsState>((set) => ({
  leads: [],
  meta: null,
  filters: defaultFilters,
  loading: false,
  error: null,
  setLeads: (leads, meta) => set({ leads, meta, error: null }),
  setFilters: (patch) =>
    set((s) => {
      const resetPage =
        patch.page === undefined &&
        (patch.search !== undefined ||
          patch.status !== undefined ||
          patch.source !== undefined ||
          patch.sort !== undefined);
      return {
        filters: {
          ...s.filters,
          ...patch,
          page: patch.page ?? (resetPage ? 1 : s.filters.page),
        },
      };
    }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
