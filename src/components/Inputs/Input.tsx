import { cn } from '@/utils/cn';
import type { ComponentProps } from 'react';
import { ContentProps } from '../Tooltip/Content';
import { styles } from './styles';

export type InputProps = ComponentProps<'input'> & {
  error?: boolean;
};

export const Input = ({
  type = 'text',
  className,
  error,
  ...rest
}: InputProps) => {
  return (
    <input
      type={type}
      className={cn(
        'focus:outline-none h-9',
        styles.stylesDefault,
        styles.fontDefault,
        error && styles.error,
        styles.disabled,
        className,
      )}
      {...rest}
    />
  );
};
