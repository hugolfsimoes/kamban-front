
import { Root, type DialogProps } from '@radix-ui/react-dialog';
import { useImperativeHandle, useState, type Ref } from 'react';

export type ModalRootWithContextRef = {
  open: () => void;
  close: () => void;
};

export type ModalRootWithContextProps = DialogProps & {
  ref: Ref<ModalRootWithContextRef> | null;
};

export function ModalRootWithContext({
  ref,
  ...props
}: ModalRootWithContextProps) {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  return <Root open={isOpen} onOpenChange={setIsOpen} {...props} />;
}
