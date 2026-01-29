import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal, type ModalRootWithContextRef } from '@/components/Modal';
import { Button } from '@/components/Button';
import { createColumn } from '@/services/columns';
import { FaPlus } from 'react-icons/fa6';
import { Input } from '@/components/Inputs/Input';

const schema = z.object({
  title: z
    .string()
    .nonempty('O nome da coluna é obrigatório')
    .min(2, 'Nome da coluna muito curto'),
});

type FormValues = z.infer<typeof schema>;

type CreateColumnModalProps = {
  boardId: string;
};

export function CreateColumnModal({ boardId }: CreateColumnModalProps) {
  const modalRef = useRef<ModalRootWithContextRef>(null);
  const queryClient = useQueryClient();

  const { reset, handleSubmit, register, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] });
      modalRef.current?.close();
      reset();
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate({ boardId, title: data.title });
  };

  return (
    <Modal.RootWithContext ref={modalRef}>
      <Modal.Trigger asChild>
        <Button variant='primary' size='lg' className='gap-4' type='button'>
          <FaPlus size={16} color='white' />
          <span> Nova coluna</span>
        </Button>
      </Modal.Trigger>

      <Modal.Portal position='center' className='w-full max-w-[650px]'>
        <Modal.XClose />

        <Modal.Title className='text-primary-100 text-xl text-start'>
          Criar nova coluna
        </Modal.Title>

        <Modal.Content>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <div className='flex flex-col gap-1'>
              <label className='font-medium'>
                Digite o nome da nova coluna
              </label>
              <Input placeholder='Digite o nome' {...register('title')} />
              {formState.errors.title && (
                <span className='text-sm text-red-500'>
                  {formState.errors.title.message}
                </span>
              )}
            </div>

            <div className='flex justify-end gap-2 mt-4'>
              <Button
                type='button'
                variant='secondary'
                onClick={() => modalRef.current?.close()}
              >
                Cancelar
              </Button>

              <Button type='submit' variant='primary' disabled={isPending}>
                {isPending ? 'Criando...' : 'Criar nova coluna'}
              </Button>
            </div>
          </form>
        </Modal.Content>
      </Modal.Portal>
    </Modal.RootWithContext>
  );
}
