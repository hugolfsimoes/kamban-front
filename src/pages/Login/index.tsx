import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/logo.svg';
import AuthLayout from '../../layouts/AuthLayout';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useNavigate } from '@tanstack/react-router';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [apiError, setApiError] = useState<string | null>(null);
  const { signin } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors: clearFieldErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      await signin(data);
      navigate({ to: '/dashboard' });
    } catch (err: any) {
      if (err.response?.status === 401) {
        setApiError('Credenciais inválidas');
      } else if (err.response?.status === 400) {
        setApiError('Preencha os campos corretamente');
      } else {
        setApiError('Erro inesperado. Tente novamente mais tarde.');
      }
    }
  }

  function clearApiError() {
    setApiError(null);
  }

  return (
    <AuthLayout>
      <img src={Logo} alt='Logo Kanban' className='w-24 h-24 mb-6' />
      <div className='flex flex-col items-center gap-3'>
        <h1>Entre em sua conta</h1>
        <div className='space-x-1'>
          <span>Novo por aqui?</span>
          <a href='/register' className='text-4'>
            Crie uma conta
          </a>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-sm space-y-4 mt-8'
      >
        <div className='flex flex-col'>
          <Input
            id='email'
            type='email'
            label='Email'
            placeholder='Digite seu email'
            error={errors.email?.message}
            {...register('email')}
            onChange={(e) => {
              clearFieldErrors('email');
              clearApiError();
              register('email').onChange(e);
            }}
          />
        </div>

        <div className='flex flex-col'>
          <Input
            id='password'
            type='password'
            label='Senha'
            placeholder='Digite sua senha'
            error={errors.password?.message}
            {...register('password')}
            onChange={(e) => {
              clearFieldErrors('password');
              clearApiError();
              register('password').onChange(e);
            }}
          />
        </div>

        {apiError && (
          <div className='p-5 w-full bg-red-100 rounded-md'>
            <p className='text-sm text-red-500 text-center'>{apiError}</p>
          </div>
        )}

        <Button
          type='submit'
          className='w-full rounded-lg transition cursor-pointer'
        >
          Entrar
        </Button>
      </form>
    </AuthLayout>
  );
}
