import { z } from 'zod';

const leadStatus = z.enum(['New', 'Contacted', 'Qualified', 'Lost']);
const leadSource = z.enum(['Website', 'Instagram', 'Referral']);

export const createLeadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  status: leadStatus.optional(),
  source: leadSource,
});

export const updateLeadSchema = z
  .object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().optional(),
    status: leadStatus.optional(),
    source: leadSource.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required to update',
  });

export const leadListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  status: leadStatus.optional(),
  source: leadSource.optional(),
  search: z.string().max(120).optional(),
  sort: z.enum(['latest', 'oldest']).optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
