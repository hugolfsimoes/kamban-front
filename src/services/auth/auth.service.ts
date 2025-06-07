
import { api } from '@/api/api';

export interface SigninDTO {
  email: string;
  password: string;
}

export interface SignupDTO {
  name: string;
  email: string;
  password: string;
  organizationName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
export interface AuthResponse {
  user: User;
  token: string;
}
export async function signin(data: SigninDTO): Promise<AuthResponse> {
  const response = await api.post('/auth/login', data);
  return response.data;
}

export async function signup(data: SignupDTO): Promise<AuthResponse> {
  const response = await api.post('/auth/signup', data);
  return response.data;
}