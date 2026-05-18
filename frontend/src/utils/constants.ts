import { LeadSource, LeadStatus } from '@/types';

export const LEAD_STATUSES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];

export const LEAD_SOURCES: LeadSource[] = ['Website', 'Instagram', 'Referral'];

export const STATUS_COLORS: Record<LeadStatus, string> = {
  New: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
  Contacted: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  Qualified: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  Lost: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
};
