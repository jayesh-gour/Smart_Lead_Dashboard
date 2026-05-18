import { Link } from 'react-router-dom';
import { Lead } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export function LeadsTable({ leads, onEdit, onDelete }: LeadsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
        <thead className="bg-slate-50 dark:bg-slate-900/50">
          <tr>
            {['Name', 'Email', 'Status', 'Source', 'Created', 'Actions'].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
              <td className="px-4 py-3 text-sm font-medium">
                <Link
                  to={`/leads/${lead.id}`}
                  className="text-brand-600 hover:underline dark:text-brand-400"
                >
                  {lead.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{lead.email}</td>
              <td className="px-4 py-3">
                <Badge status={lead.status} />
              </td>
              <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{lead.source}</td>
              <td className="px-4 py-3 text-sm text-slate-500">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(lead)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(lead)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
