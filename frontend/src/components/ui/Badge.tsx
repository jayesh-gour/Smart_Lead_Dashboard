import { cn } from '@/utils/cn';
import { LeadStatus } from '@/types';
import { STATUS_COLORS } from '@/utils/constants';

interface BadgeProps {
  status: LeadStatus;
}

export function Badge({ status }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
        STATUS_COLORS[status]
      )}
    >
      {status}
    </span>
  );
}
