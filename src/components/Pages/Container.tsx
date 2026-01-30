import { cn } from '@/utils/cn';
import { type HTMLAttributes } from 'react';

export function Container({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('h-full flex flex-col overflow-y-auto p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
}
