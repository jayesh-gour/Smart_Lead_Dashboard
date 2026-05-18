import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/features/auth/authStore';
import { registerSchema, RegisterForm } from '@/features/auth/schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AxiosError } from 'axios';
import { ApiResponse } from '@/types';

export function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const { data } = await authApi.register(values);
      if (data.success && data.data) {
        setAuth(data.data.user, data.data.token);
        toast.success('Account created');
        navigate('/');
      }
    } catch (err) {
      const msg =
        (err as AxiosError<ApiResponse>).response?.data?.message ?? 'Registration failed';
      toast.error(msg);
    }
  });

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create account</h1>
      <p className="mt-1 text-sm text-slate-500">New users are added as Sales by default.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Input label="Name" error={errors.name?.message} {...register('name')} />
        <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
        <Input label="Password" type="password" error={errors.password?.message} {...register('password')} />
        <Button type="submit" className="w-full" loading={isSubmitting}>
          Register
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-brand-600 hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
}
