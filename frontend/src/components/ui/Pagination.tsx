import { Button } from './Button';
import { PaginationMeta } from '@/types';

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
  const { currentPage, totalPages, totalItems, limit } = meta;

  if (totalItems === 0) return null;

  const from = (currentPage - 1) * limit + 1;
  const to = Math.min(currentPage * limit, totalItems);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
      <p className="text-sm text-slate-500">
        Showing <span className="font-medium text-slate-700 dark:text-slate-300">{from}–{to}</span> of{' '}
        <span className="font-medium text-slate-700 dark:text-slate-300">{totalItems}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
