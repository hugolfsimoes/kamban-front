
import type { ButtonHTMLAttributes } from 'react';
import { X } from 'lucide-react';
import { Close } from '@radix-ui/react-dialog';
import { cn } from '@/utils/cn';


export function ModalXClose({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Close asChild>
      <button
        type="button"
        className={cn('absolute right-4 top-4 text-primary-150', className)}
        {...props}
      >
        <X size={22} />
      </button>
    </Close>
  );
}
