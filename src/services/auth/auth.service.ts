
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
export async function signin(payload: { email: string; password: string; }) {
  const res = await api.post('/auth/login', payload);
  return res.data;
}

export async function signup(payload: {
  name: string;
  email: string;
  password: string;
  organizationName: string;
}) {
  const res = await api.post('/auth/signup', payload);
  return res.data;
}