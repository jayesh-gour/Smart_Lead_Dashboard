import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useDebounce } from '@/hooks/useDebounce';
import { LeadFilters as Filters, LeadSource, LeadStatus } from '@/types';
import { LEAD_SOURCES, LEAD_STATUSES } from '@/utils/constants';

interface LeadFiltersProps {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
}

export function LeadFiltersBar({ filters, onChange }: LeadFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search ?? '');
  const debouncedSearch = useDebounce(searchInput, 400);

  useEffect(() => {
    onChange({ search: debouncedSearch || undefined });
  }, [debouncedSearch]);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Input
        placeholder="Search name or email..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Select
        placeholder="All statuses"
        value={filters.status ?? ''}
        onChange={(e) =>
          onChange({ status: (e.target.value as LeadStatus) || undefined })
        }
        options={LEAD_STATUSES.map((s) => ({ value: s, label: s }))}
      />
      <Select
        placeholder="All sources"
        value={filters.source ?? ''}
        onChange={(e) =>
          onChange({ source: (e.target.value as LeadSource) || undefined })
        }
        options={LEAD_SOURCES.map((s) => ({ value: s, label: s }))}
      />
      <Select
        value={filters.sort}
        onChange={(e) => onChange({ sort: e.target.value as Filters['sort'] })}
        options={[
          { value: 'latest', label: 'Newest first' },
          { value: 'oldest', label: 'Oldest first' },
        ]}
      />
    </div>
  );
}
