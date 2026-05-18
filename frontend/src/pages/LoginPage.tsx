import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/features/auth/authStore';
import { loginSchema, LoginForm } from '@/features/auth/schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AxiosError } from 'axios';
import { ApiResponse } from '@/types';

export function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const { data } = await authApi.login(values);
      if (data.success && data.data) {
        setAuth(data.data.user, data.data.token);
        toast.success('Welcome back');
        navigate('/');
      }
    } catch (err) {
      const msg =
        (err as AxiosError<ApiResponse>).response?.data?.message ?? 'Login failed';
      toast.error(msg);
    }
  });

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sign in</h1>
      <p className="mt-1 text-sm text-slate-500">Use your team credentials to continue.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
        <Input label="Password" type="password" error={errors.password?.message} {...register('password')} />
        <Button type="submit" className="w-full" loading={isSubmitting}>
          Sign in
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        No account?{' '}
        <Link to="/register" className="font-medium text-brand-600 hover:underline">
          Register
        </Link>
      </p>
    </>
  );
}
