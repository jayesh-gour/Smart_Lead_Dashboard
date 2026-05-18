import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { leadsApi } from '@/api/leads.api';
import { Lead } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Loader } from '@/components/ui/Loader';
import { ErrorState } from '@/components/ui/ErrorState';
import { Button } from '@/components/ui/Button';

export function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await leadsApi.getById(id);
      if (data.success && data.data) setLead(data.data);
    } catch {
      setError('Could not load lead');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  if (loading) return <Loader />;
  if (error || !lead) return <ErrorState message={error ?? 'Lead not found'} onRetry={load} />;

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Link to="/leads" className="text-sm text-brand-600 hover:underline">
        ← Back to leads
      </Link>
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-bold">{lead.name}</h1>
          <Badge status={lead.status} />
        </div>
        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd className="font-medium">{lead.email}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Source</dt>
            <dd className="font-medium">{lead.source}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Created</dt>
            <dd className="font-medium">{new Date(lead.createdAt).toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Last updated</dt>
            <dd className="font-medium">{new Date(lead.updatedAt).toLocaleString()}</dd>
          </div>
        </dl>
        <Link to="/leads" className="mt-6 inline-block">
          <Button variant="secondary">Back to list</Button>
        </Link>
      </div>
    </div>
  );
}
