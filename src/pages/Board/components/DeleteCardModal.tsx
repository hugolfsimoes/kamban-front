import { forwardRef, type RefObject } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Modal, type ModalRootWithContextRef } from '@/components/Modal';
import { Button } from '@/components/Button';
import { deleteCard } from '@/services/cards';
import { useBoardStore } from '@/stores/boardStore';
import type { CardDTO } from '@/services/cards/types';

type DeleteCardModalProps = {
  card: CardDTO;
  columnId: string;
};

export const DeleteCardModal = forwardRef<
  ModalRootWithContextRef,
  DeleteCardModalProps
>(function DeleteCardModal({ card, columnId }, ref) {
  const removeCard = useBoardStore((state) => state.removeCard);

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteCard(card.id),
    onSuccess: () => {
      removeCard(columnId, card.id);
      (ref as RefObject<ModalRootWithContextRef>)?.current?.close();
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutate();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    (ref as RefObject<ModalRootWithContextRef>)?.current?.close();
  };

  return (
    <Modal.RootWithContext ref={ref}>
      <Modal.Portal
        position='center'
        className='w-full max-w-[650px]'
        onClick={(e) => e.stopPropagation()}
      >
        <Modal.XClose onClick={(e) => e.stopPropagation()} />
        <Modal.Title className='text-xl'>Excluir cartão</Modal.Title>

        <Modal.Content onClick={(e) => e.stopPropagation()}>
          <div className='flex flex-col gap-4'>
            <p className='text-gray-600'>
              Tem certeza que deseja excluir o cartão{' '}
              <strong>"{card.title || 'Sem título'}"</strong>?
              <br />
              Esta ação não pode ser desfeita.
            </p>

            <div className='flex justify-end gap-2 mt-4'>
              <Button type='button' variant='secondary' onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                type='button'
                variant='danger'
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? 'Excluindo...' : 'Excluir cartão'}
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.RootWithContext>
  );
});
