import { useState } from 'react';
import { useLeads } from '@/hooks/useLeads';
import { LeadFiltersBar } from '@/components/leads/LeadFilters';
import { LeadsTable } from '@/components/leads/LeadsTable';
import { LeadFormModal } from '@/components/leads/LeadFormModal';
import { Loader } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Pagination } from '@/components/ui/Pagination';
import { Button } from '@/components/ui/Button';
import { Lead } from '@/types';
import { useAuthStore } from '@/features/auth/authStore';

export function LeadsPage() {
  const {
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
  } = useLeads();

  const role = useAuthStore((s) => s.user?.role);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (lead: Lead) => {
    setEditing(lead);
    setModalOpen(true);
  };

  const handleDelete = async (lead: Lead) => {
    if (!window.confirm(`Delete ${lead.name}?`)) return;
    try {
      await deleteLead(lead.id);
    } catch {
      /* toast handled in hook if we add it */
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Leads</h1>
          <p className="text-sm text-slate-500">
            Filter, search, and export — {role === 'Admin' ? 'all records' : 'your leads only'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => exportCsv()}>
            Export CSV
          </Button>
          <Button onClick={openCreate}>Add lead</Button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <LeadFiltersBar filters={filters} onChange={setFilters} />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {loading && <Loader />}
        {!loading && error && <ErrorState message={error} onRetry={fetchLeads} />}
        {!loading && !error && leads.length === 0 && <EmptyState />}
        {!loading && !error && leads.length > 0 && (
          <>
            <LeadsTable leads={leads} onEdit={openEdit} onDelete={handleDelete} />
            {meta && (
              <Pagination meta={meta} onPageChange={(page) => setFilters({ page })} />
            )}
          </>
        )}
      </div>

      <LeadFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        lead={editing}
        onSubmit={async (data) => {
          if (editing) {
            await updateLead(editing.id, data);
          } else {
            await createLead(data);
          }
        }}
      />
    </div>
  );
}
