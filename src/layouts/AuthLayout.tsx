import { ReactNode } from 'react';
import ImageLogin from '@/assets/login_image.png';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='flex h-screen w-full'>
      <div
        className='hidden md:block w-1/2 h-full bg-cover bg-center'
        style={{ backgroundImage: `url(${ImageLogin})` }}
      />
      <div className='w-full md:w-1/2 h-full flex flex-col justify-center items-center px-8 bg-white'>
        {children}
      </div>
    </div>
  );
}
