import { createContext, useContext, useState, ReactNode } from 'react';
import { SignininDTO, signin as login } from '../services/auth/signin';
import { signup, SignupDTO } from '../services/auth/signup';

interface AuthContextData {
  user: any;
  signin: (data: SignininDTO) => Promise<void>;
  register: (data: SignupDTO) => Promise<void>;
  signout: () => void;
}

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  async function signin(data: SignininDTO) {
    const { user, token } = await login(data);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  async function register(data: SignupDTO) {
    const { user, token } = await signup(data);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  function signout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signin, register, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
