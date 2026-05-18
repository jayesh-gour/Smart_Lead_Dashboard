import { useEffect } from 'react';
import { AppRoutes } from '@/routes/AppRoutes';
import { useAuthStore } from '@/features/auth/authStore';
import { authApi } from '@/api/auth.api';

export default function App() {
  const { token, setUser, logout } = useAuthStore();

  useEffect(() => {
    if (!token) return;
    authApi
      .me()
      .then((res) => {
        if (res.data.success && res.data.data) {
          setUser(res.data.data);
        }
      })
      .catch(() => logout());
  }, [token, setUser, logout]);

  return <AppRoutes />;
}
