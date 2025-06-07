import { type FormEvent, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/logo.svg';
import AuthLayout from '../../layouts/AuthLayout';

export default function Login() {
  const { signin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await signin({ email, password });
    } catch (err: any) {
      setError(err.message || 'Erro ao autenticar');
    }
  }

  return (
    <AuthLayout>
      <img src={Logo} alt='Logo Kanban' className='w-24 h-24 mb-6' />
      <form onSubmit={handleSubmit} className='w-full max-w-sm space-y-4'>
        <div className='flex flex-col'>
          <label
            htmlFor='email'
            className='mb-1 text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='Digite seu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='password'
            className='mb-1 text-sm font-medium text-gray-700'
          >
            Senha
          </label>
          <input
            id='password'
            type='password'
            placeholder='Digite sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <button
          type='submit'
          className='w-full py-2 px-4 bg-[var(--primary)] text-white rounded hover:bg-opacity-90 transition'
        >
          Entrar
        </button>
      </form>
    </AuthLayout>
  );
}
