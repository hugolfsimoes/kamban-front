
import { cn } from '@/utils/cn';
import {
  Title as TitleDefault,
  type DialogTitleProps,
} from '@radix-ui/react-dialog';

export function ModalTitle({ className, ...props }: DialogTitleProps) {
  return (
    <TitleDefault
      className={cn('font-semibold text-base font-poppins', className)}
      {...props}
    />
  );
}
