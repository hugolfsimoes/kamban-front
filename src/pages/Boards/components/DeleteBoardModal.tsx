import { forwardRef, type RefObject } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, type ModalRootWithContextRef } from '@/components/Modal';
import { Button } from '@/components/Button';
import { deleteBoard } from '@/services/boards';
import { IBoard } from '@/Interfaces/IBoard';

type DeleteBoardModalProps = {
  board: IBoard;
};

export const DeleteBoardModal = forwardRef<
  ModalRootWithContextRef,
  DeleteBoardModalProps
>(function DeleteBoardModal({ board }, ref) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteBoard(board.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      (ref as RefObject<ModalRootWithContextRef>)?.current?.close();
    },
  });

  const handleDelete = () => {
    mutate();
  };

  const handleClose = () => {
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
        <Modal.Title className='text-xl'>Excluir quadro</Modal.Title>

        <Modal.Content onClick={(e) => e.stopPropagation()}>
          <div className='flex flex-col gap-4'>
            <p className='text-gray-600'>
              Tem certeza que deseja excluir o quadro{' '}
              <strong>"{board.name}"</strong>?<br />
              Esta ação não pode ser desfeita.
            </p>

            <div className='flex justify-end gap-2 mt-4'>
              <Button
                type='button'
                variant='secondary'
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              >
                Cancelar
              </Button>

              <Button
                type='button'
                variant='primary'
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isPending}
              >
                {isPending ? 'Excluindo...' : 'Excluir quadro'}
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.RootWithContext>
  );
});
