import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import jwtDecode from 'jwt-decode';
import * as authService from '@/services/auth/auth.service';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signin: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    organizationName: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect AuthProvider');

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error('Token inválido ou expirado');
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  async function signin(data: { email: string; password: string }) {
    console.log('papapapapS');

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

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log(context);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
