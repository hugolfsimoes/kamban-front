
import { cn } from '@/utils/cn';
import {
  Portal as PortalDefault,
  type DialogContentProps,
  Overlay,
  Content,
} from '@radix-ui/react-dialog';

export interface ModalPortalProps extends DialogContentProps {
  position?: 'center' | 'right';
}

export function ModalPortal({
  className,
  children,
  position = 'center',
  ...props
}: ModalPortalProps) {
  return (
    <PortalDefault>
      <Overlay
        className="
          fixed inset-0 z-10 bg-black/50
          animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)]
        "
        onDoubleClick={(e) => e.stopPropagation()}
      />

      <Content
        aria-describedby={undefined}
        onInteractOutside={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest('.custom-toast-element')) {
            event.preventDefault();
          }
        }}
        className={cn(
          'fixed bg-white',
          position === 'center' &&
            `
            left-1/2 top-1/2 z-30
            -translate-x-1/2 -translate-y-1/2
            max-h-[calc(100vh-40px)]
            animate-[contentShow_150ms_cubic-bezier(0.16,1,0.3,1)]
            rounded-2xl
            shadow-[3px_3px_6px_rgba(0,0,0,0.16)]
            p-10
          `,
          position === 'right' &&
            `
            top-0 right-0 z-30
            h-full w-1/2
            data-[state=open]:translate-x-0
            data-[state=closed]:translate-x-full
            transition-transform duration-300 ease-in-out
            p-6
          `,
          className
        )}
        {...props}
      >
        {children}
      </Content>
    </PortalDefault>
  );
}
