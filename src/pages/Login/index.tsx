import { FormEvent, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { signin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await signin({ email, password });
  }

  return (
    <div className='max-w-sm mx-auto p-4'>
      <h1 className='text-2xl mb-4'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <input
          className='border p-2'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          className='border p-2'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' className='bg-blue-500 text-white p-2 mt-2'>
          Entrar
        </button>
      </form>
    </div>
  );
}
