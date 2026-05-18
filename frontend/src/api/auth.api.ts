import { api } from './client';
import { ApiResponse, AuthPayload, User } from '@/types';

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export const authApi = {
  register: (body: RegisterBody) =>
    api.post<ApiResponse<AuthPayload>>('/auth/register', body),

  login: (body: LoginBody) =>
    api.post<ApiResponse<AuthPayload>>('/auth/login', body),

  me: () => api.get<ApiResponse<User>>('/auth/me'),
};
