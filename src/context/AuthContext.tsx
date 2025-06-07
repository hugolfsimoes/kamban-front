import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from 'react';
import {
  SigninDTO,
  signin as signinRequest,
  SignupDTO,
  signup as signupRequest,
  User,
} from '@/services/auth/auth.service';

interface AuthContextData {
  user: User | null;
  signin: (data: SigninDTO) => Promise<void>;
  register: (data: SignupDTO) => Promise<void>;
  signout: () => void;
}

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  async function signin(data: SigninDTO) {
    const { user, token } = await signinRequest(data);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  async function register(data: SignupDTO) {
    const { user, token } = await signupRequest(data);
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
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
