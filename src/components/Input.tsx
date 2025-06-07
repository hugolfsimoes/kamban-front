// src/components/ui/input.tsx
import { cn } from '@/utils/cn';
import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, icon, error, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className='w-full space-y-1'>
        {label && (
          <label
            htmlFor={inputId}
            className='block text-sm font-medium text-foreground'
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            'flex h-10 w-full items-center rounded-md border border-gray-400 px-3 text-sm shadow-sm transition-colors',
            'focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-400',
            error ? 'border-red-500 ' : 'bg-background text-foreground',
            className,
          )}
        >
          {icon && <span className='mr-2 text-muted-foreground'>{icon}</span>}
          <input
            id={inputId}
            type={type}
            className='w-full bg-transparent outline-none placeholder:text-muted-foreground dark:bg-primary-bg'
            ref={ref}
            {...props}
          />
        </div>

        {error && <p className='text-xs text-red-500'>{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
