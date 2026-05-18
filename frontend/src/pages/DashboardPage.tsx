import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/authStore';
import { leadsApi } from '@/api/leads.api';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { LEAD_STATUSES } from '@/utils/constants';
import { LeadStats } from '@/types';

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    leadsApi
      .stats()
      .then((res) => {
        if (res.data.success && res.data.data) {
          setStats(res.data.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Hey, {user?.name?.split(' ')[0] ?? 'there'}
        </h1>
        <p className="mt-1 text-slate-500">
          {user?.role === 'Admin'
            ? 'You can see and manage all leads in the workspace.'
            : 'You only see leads assigned to your account.'}
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LEAD_STATUSES.map((status) => (
            <div
              key={status}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-sm text-slate-500">{status}</p>
              <p className="mt-1 text-2xl font-semibold">
                {stats?.byStatus[status] ?? 0}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Quick stats</h2>
            <p className="text-sm text-slate-500">
              {stats?.total ?? 0} leads in your workspace
            </p>
          </div>
          <Link to="/leads">
            <Button>View all leads</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
