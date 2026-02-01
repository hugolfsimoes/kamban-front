import { forwardRef, type RefObject } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal, type ModalRootWithContextRef } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Inputs/Input';
import { updateCard } from '@/services/cards';
import { useBoardStore } from '@/stores/boardStore';
import type { CardDTO } from '@/services/cards/types';
import { cn } from '@/utils/cn';
import { styles } from '@/components/Inputs/styles';

const schema = z.object({
  title: z
    .string()
    .min(1, 'O título é obrigatório')
    .min(2, 'Título muito curto'),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type EditCardModalProps = {
  card: CardDTO;
};

export const EditCardModal = forwardRef<
  ModalRootWithContextRef,
  EditCardModalProps
>(function EditCardModal({ card }, ref) {
  const updateCardInStore = useBoardStore((state) => state.updateCardInStore);

  const { reset, handleSubmit, register, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: card.title ?? '',
      description: card.description ?? '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateCard,
    onSuccess: (updated) => {
      updateCardInStore(card.id, {
        title: updated.title,
        description: updated.description,
      });
      (ref as RefObject<ModalRootWithContextRef>)?.current?.close();
      reset({ title: updated.title, description: updated.description });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate({
      id: card.id,
      title: data.title,
      description: data.description ?? '',
    });
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
        <Modal.Title className='text-primary-100 text-xl text-start'>
          Editar cartão
        </Modal.Title>

        <Modal.Content onClick={(e) => e.stopPropagation()}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <div className='flex flex-col gap-1'>
              <label className='font-medium'>Título</label>
              <Input placeholder='Título do cartão' {...register('title')} />
              {formState.errors.title && (
                <span className='text-sm text-red-500'>
                  {formState.errors.title.message}
                </span>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-medium'>Descrição (opcional)</label>
              <textarea
                placeholder='Descrição'
                rows={3}
                className={cn(
                  'w-full px-4 py-2 rounded-md border border-gray-100 bg-white resize-none focus:outline-none',
                  styles.fontDefault,
                )}
                {...register('description')}
              />
            </div>

            <div className='flex justify-end gap-2 mt-4'>
              <Button type='button' variant='secondary' onClick={handleClose}>
                Cancelar
              </Button>
              <Button type='submit' variant='primary' disabled={isPending}>
                {isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </Modal.Content>
      </Modal.Portal>
    </Modal.RootWithContext>
  );
});
