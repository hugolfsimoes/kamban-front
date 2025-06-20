import { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='h-16 bg-primary text-white flex items-center justify-between px-6 shadow-md'>
        <Link
          to='/app/boards'
          className='text-xl font-bold'
          search={{ teste: 'teste' }}
        >
          MeuApp
        </Link>

        <nav className='flex items-center gap-4'>
          <Link to='/' className='hover:underline'>
            Boardsauthenticated
          </Link>
          <Link to='/' className='hover:underline'>
            Configurações
          </Link>
          <button className='bg-secondary text-white px-3 py-1 rounded-md hover:opacity-90'>
            Sair
          </button>
        </nav>
      </header>

      <main className='flex-1 p-6 bg-gray-50'>{children}</main>
    </div>
  );
}
