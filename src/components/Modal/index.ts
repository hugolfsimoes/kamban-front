// index.ts
import { Root, Trigger, Close, type DialogProps } from './ModalRoot';
import { ModalPortal, type ModalPortalProps } from './ModalPortal';
import { ModalContent } from './ModalContent';
import { ModalTitle } from './ModalTitle';
import { ModalXClose } from './ModalXClose';
import {
  ModalRootWithContext,
  type ModalRootWithContextRef,
} from './ModalRootWithContext';

export const Modal = {
  Root,
  Trigger,
  Close,
  Portal: ModalPortal,
  Title: ModalTitle,
  XClose: ModalXClose,
  Content: ModalContent,
  RootWithContext: ModalRootWithContext,
};

export type {
  DialogProps,
  ModalPortalProps,
  ModalRootWithContextRef,
};
