import { type FormEvent, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/logo.svg';
import AuthLayout from '../../layouts/AuthLayout';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function Register() {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await signup({ name, email, password, organizationName });
      // opcional: redirecionar após sucesso
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta');
    }
  }

  return (
    <AuthLayout>
      <img src={Logo} alt='Logo Kanban' className='w-24 h-24 mb-6' />
      <div className='flex flex-col items-center gap-3'>
        <h1>Crie sua conta</h1>
        <div className='space-x-1'>
          <span>Já tem uma conta?</span>
          <a href='/' className='text-4'>
            Faça login
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='w-full max-w-sm space-y-4 mt-8'>
        <div className='flex flex-col'>
          <Input
            id='name'
            type='text'
            placeholder='Seu nome completo'
            value={name}
            label='Nome'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <Input
            id='organizationName'
            type='text'
            placeholder='Nome da Organização'
            value={organizationName}
            label='Nome da Organização'
            onChange={(e) => setOrganizationName(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <Input
            id='email'
            type='email'
            placeholder='Digite seu email'
            value={email}
            label='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <Input
            id='password'
            type='password'
            placeholder='Crie uma senha'
            value={password}
            label='Senha'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <Button
          type='submit'
          className='w-full rounded-lg transition cursor-pointer'
        >
          Criar conta
        </Button>
      </form>
    </AuthLayout>
  );
}
