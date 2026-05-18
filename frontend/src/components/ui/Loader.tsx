import { cn } from '@/utils/cn';

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn('flex justify-center py-12', className)}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" aria-hidden />
    </div>
  );
}
