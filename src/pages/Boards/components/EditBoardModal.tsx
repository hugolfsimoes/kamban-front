import { forwardRef, type RefObject } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal, type ModalRootWithContextRef } from '@/components/Modal';
import { Button } from '@/components/Button';
import { updateBoard } from '@/services/boards';
import { InputColor } from '@/components/Inputs/InputColor';
import { Input } from '@/components/Inputs/Input';
import { IBoard } from '@/Interfaces/IBoard';

const schema = z.object({
  name: z
    .string()
    .nonempty('O nome do board é obrigatório')
    .min(2, 'Nome muito curto'),
  color: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

type EditBoardModalProps = {
  board: IBoard;
};

export const EditBoardModal = forwardRef<
  ModalRootWithContextRef,
  EditBoardModalProps
>(function EditBoardModal({ board }, ref) {
  const queryClient = useQueryClient();

  const { reset, control, handleSubmit, register, formState } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        name: board.name,
        color: board.color,
      },
    });

  const { mutate, isPending } = useMutation({
    mutationFn: updateBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      (ref as RefObject<ModalRootWithContextRef>)?.current?.close();
      reset();
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate({ id: board.id, name: data.name, color: data.color });
  };

  return (
    <Modal.RootWithContext ref={ref}>
      <Modal.Portal
        position='center'
        className='w-full max-w-[650px]'
        onClick={(e) => e.stopPropagation()}
      >
        <Modal.XClose onClick={(e) => e.stopPropagation()} />

        <Modal.Title className='text-primary-100 text-xl text-start'>
          Editar board
        </Modal.Title>

        <Modal.Content onClick={(e) => e.stopPropagation()}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <div className='flex flex-col gap-1'>
              <label className='font-medium'>Digite o nome do board</label>
              <Input placeholder='Digite o nome' {...register('name')} />
              {formState.errors.name && (
                <span className='text-sm text-red-500'>
                  {formState.errors.name.message}
                </span>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-medium'>Cor</label>

              <div className='flex flex-wrap gap-2'>
                <InputColor control={control} registerTitle='color' />
              </div>
            </div>

            <div className='flex justify-end gap-2 mt-4'>
              <Button
                type='button'
                variant='secondary'
                onClick={(e) => {
                  e.stopPropagation();
                  (ref as RefObject<ModalRootWithContextRef>)?.current?.close();
                }}
              >
                Cancelar
              </Button>

              <Button type='submit' variant='primary' disabled={isPending}>
                {isPending ? 'Atualizando...' : 'Atualizar board'}
              </Button>
            </div>
          </form>
        </Modal.Content>
      </Modal.Portal>
    </Modal.RootWithContext>
  );
});
