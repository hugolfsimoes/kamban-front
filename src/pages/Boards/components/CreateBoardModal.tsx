import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal, type ModalRootWithContextRef } from '@/components/Modal';
import { Button } from '@/components/Button';
import { createBoard } from '@/services/boards';
import { FaPlus } from 'react-icons/fa6';

const schema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  color: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;


const COLORS = [
  '#0079BF',
  '#70B500',
  '#FF9F1A',
  '#EB5A46',
  '#C377E0',
  '#00C2E0',
  '#51E898',
  '#FF78CB',
];

export function CreateBoardModal() {
  const modalRef = useRef<ModalRootWithContextRef>(null);
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      color: COLORS[0],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      modalRef.current?.close();
      form.reset();
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <Modal.RootWithContext ref={modalRef}>
      {/* TRIGGER - opcional (pode usar Button) */}
      <Modal.Trigger asChild>
        <Button variant="primary" size="lg" className='gap-4' type='button'>
          <FaPlus size={16} color='white' />
          <span> Novo quadro</span>
        </Button>
      </Modal.Trigger>

      {/* PORTAL */}
      <Modal.Portal position="center">
        <Modal.XClose />

        <Modal.Title className="text-xl">Criar novo board</Modal.Title>

        <Modal.Content>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Nome */}
            <div className="flex flex-col gap-1">
              <label className="font-medium">Nome do board</label>
              <input
                className="border rounded p-2"
                placeholder="Digite o nome"
                {...form.register('name')}
              />
              {form.formState.errors.name && (
                <span className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </span>
              )}
            </div>

            {/* Cores */}
            <div className="flex flex-col gap-1">
              <label className="font-medium">Cor</label>

              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => form.setValue('color', c)}
                    className={`
                      h-8 w-8 rounded 
                      border-2 
                      ${form.watch('color') === c ? 'border-black' : 'border-transparent'}
                    `}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => modalRef.current?.close()}
              >
                Cancelar
              </Button>

              <Button type="submit" variant="primary" disabled={isPending}>
                {isPending ? 'Criando...' : 'Criar'}
              </Button>
            </div>
          </form>
        </Modal.Content>
      </Modal.Portal>
    </Modal.RootWithContext>
  );
}
