import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, type ModalRootWithContextRef } from '@/components/Modal';
import { Button } from '@/components/Button';
import { deleteBoard } from '@/services/boards';
import { IBoard } from '@/Interfaces/IBoard';

type DeleteBoardModalProps = {
  board: IBoard;
  children: React.ReactNode;
};

export function DeleteBoardModal({ board, children }: DeleteBoardModalProps) {
  const modalRef = useRef<ModalRootWithContextRef>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteBoard(board.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      modalRef.current?.close();
    },
  });

  const handleDelete = () => {
    mutate();
  };

  const handleClose = () => {
    modalRef.current?.close();

  };

  return (
    <Modal.RootWithContext ref={modalRef}>
      <Modal.Trigger asChild>
        {children}
      </Modal.Trigger>

      <Modal.Portal
        position="center"
        className='w-full max-w-[650px]'
        onClick={(e) => e.stopPropagation()}
      >
        <Modal.XClose onClick={(e) => e.stopPropagation()} />
        <Modal.Title className="text-xl">Excluir quadro</Modal.Title>

        <Modal.Content onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col gap-4">
            <p className="text-gray-600">
              Tem certeza que deseja excluir o quadro <strong>"{board.name}"</strong>?<br />
              Esta ação não pode ser desfeita.
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              >
                Cancelar
              </Button>

              <Button
                type="button"
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isPending}
              >
                {isPending ? 'Excluindo...' : 'Excluir'}
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.RootWithContext>
  );
}

