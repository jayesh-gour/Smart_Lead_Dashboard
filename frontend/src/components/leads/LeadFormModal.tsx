import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Lead } from '@/types';
import { LEAD_SOURCES, LEAD_STATUSES } from '@/utils/constants';

const schema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']),
  source: z.enum(['Website', 'Instagram', 'Referral']),
});

type FormValues = z.infer<typeof schema>;

interface LeadFormModalProps {
  open: boolean;
  onClose: () => void;
  lead?: Lead | null;
  onSubmit: (data: FormValues) => Promise<void>;
}

export function LeadFormModal({ open, onClose, lead, onSubmit }: LeadFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      status: 'New',
      source: 'Website',
    },
  });

  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source,
      });
    } else {
      reset({ name: '', email: '', status: 'New', source: 'Website' });
    }
  }, [lead, open, reset]);

  const submit = handleSubmit(async (data) => {
    await onSubmit(data);
    onClose();
  });

  return (
    <Modal open={open} onClose={onClose} title={lead ? 'Edit lead' : 'New lead'}>
      <form onSubmit={submit} className="space-y-4">
        <Input label="Name" error={errors.name?.message} {...register('name')} />
        <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
        <Select
          label="Status"
          error={errors.status?.message}
          options={LEAD_STATUSES.map((s) => ({ value: s, label: s }))}
          {...register('status')}
        />
        <Select
          label="Source"
          error={errors.source?.message}
          options={LEAD_SOURCES.map((s) => ({ value: s, label: s }))}
          {...register('source')}
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            {lead ? 'Save changes' : 'Create lead'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
