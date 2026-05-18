import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { leadsApi } from '@/api/leads.api';
import { useLeadsStore } from '@/features/leads/leadsStore';
import { LeadFormData } from '@/api/leads.api';
import { LeadFilters } from '@/types';
import { AxiosError } from 'axios';
import { ApiResponse } from '@/types';

const getErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) {
    const data = err.response?.data as ApiResponse | undefined;
    return data?.message ?? data?.errors?.[0] ?? 'Request failed';
  }
  return 'Something went wrong';
};

export function useLeads() {
  const {
    leads,
    meta,
    filters,
    loading,
    error,
    setLeads,
    setFilters,
    setLoading,
    setError,
  } = useLeadsStore();

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await leadsApi.list(filters);
      if (data.success && data.data && data.meta) {
        setLeads(data.data, data.meta);
      }
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [filters, setLeads, setLoading, setError]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const createLead = async (body: LeadFormData) => {
    const { data } = await leadsApi.create(body);
    toast.success(data.message);
    await fetchLeads();
    return data.data;
  };

  const updateLead = async (id: string, body: Partial<LeadFormData>) => {
    const { data } = await leadsApi.update(id, body);
    toast.success(data.message);
    await fetchLeads();
    return data.data;
  };

  const deleteLead = async (id: string) => {
    await leadsApi.remove(id);
    toast.success('Lead removed');
    await fetchLeads();
  };

  const exportCsv = async (exportFilters?: Partial<LeadFilters>) => {
    const params = exportFilters ?? filters;
    const res = await leadsApi.exportCsv(params);
    const blob = new Blob([res.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Export downloaded');
  };

  return {
    leads,
    meta,
    filters,
    loading,
    error,
    setFilters,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
    exportCsv,
  };
}
