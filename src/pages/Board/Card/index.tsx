import { useRef } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import type { CardDTO } from '@/services/cards/types';
import { Tooltip } from '@/components/Tooltip';
import { EditCardModal } from '../components/EditCardModal';
import { DeleteCardModal } from '../components/DeleteCardModal';
import type { ModalRootWithContextRef } from '@/components/Modal';

interface CardCardProps {
  card: CardDTO;
  index: number;
  columnId: string;
}

export function Card({ card, index, columnId }: CardCardProps) {
  const editModalRef = useRef<ModalRootWithContextRef>(null);
  const deleteModalRef = useRef<ModalRootWithContextRef>(null);

  const openEditModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    editModalRef.current?.open();
  };

  const openDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteModalRef.current?.open();
  };

  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='min-h-20 w-full max-w-60 rounded-md border border-gray-200 bg-gray-50 p-3 text-texto shadow-sm transition-shadow hover:shadow-md cursor-pointer'
        >
          <div
            className='flex items-center justify-between gap-2'
            onClick={openEditModal}
          >
            <div className='font-medium min-w-0 flex-1'>
              {card.title || 'Sem título'}
            </div>
            <div className='flex shrink-0' onClick={(e) => e.stopPropagation()}>
              <DeleteCardModal
                ref={deleteModalRef}
                card={card}
                columnId={columnId}
              />
              <Tooltip.SimpleComponent text='Excluir cartão' color='danger'>
                <button
                  type='button'
                  className='cursor-pointer p-1 rounded text-texto transition-colors hover:text-red-400'
                  onClick={openDeleteModal}
                >
                  <FaTrash size={14} />
                </button>
              </Tooltip.SimpleComponent>
            </div>
          </div>
          {card.description && (
            <p className='mt-1 text-sm text-gray-600 line-clamp-2'>
              {card.description}
            </p>
          )}
          <EditCardModal ref={editModalRef} card={card} />
        </div>
      )}
    </Draggable>
  );
}
