import { createContext, useContext, useState } from 'react';
import * as authService from '@/services/auth/auth.service';

interface AuthContextType {
  user: any | null;
  signin: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    organizationName: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  async function signin(data: { email: string; password: string }) {
    const { user, token } = await authService.signin(data);
    setUser(user);
    localStorage.setItem('token', token);
  }

  async function signup(data: {
    name: string;
    email: string;
    password: string;
    organizationName: string;
  }) {
    const { user, token } = await authService.signup(data);
    setUser(user);
    localStorage.setItem('token', token);
  }

  return (
    <AuthContext.Provider value={{ user, signin, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
