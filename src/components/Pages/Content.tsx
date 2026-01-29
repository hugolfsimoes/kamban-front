import { cn } from '@/utils/cn';
import { type HTMLAttributes } from 'react';

export function Content({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className='h-screen flex flex-col p-6' {...props}>
      {children}
    </div>
  );
}
