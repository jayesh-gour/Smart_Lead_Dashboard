interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = 'No leads found',
  description = 'Try adjusting filters or add a new lead.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl dark:bg-slate-800">
        📋
      </div>
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
      <p className="mt-1 max-w-xs text-sm text-slate-500">{description}</p>
    </div>
  );
}
