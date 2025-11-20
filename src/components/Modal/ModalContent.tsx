
import { cn } from '@/utils/cn';
import { type HTMLAttributes } from 'react';

export function ModalContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('py-6', className)} {...props}>
      {children}
    </div>
  );
}
