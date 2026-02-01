import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useMutation } from '@tanstack/react-query';
import { useBoardStore } from '@/stores/boardStore';
import { useDragEndDropHandler } from '../hooks/useDragEndDropHandler';
import { Card } from '../Card';
import { Button } from '@/components/Button';
import { createCard } from '@/services/cards';
import { FaPlus } from 'react-icons/fa6';

export function BoardColumns() {
  const board = useBoardStore((state) => state.board);
  const addCard = useBoardStore((state) => state.addCard);
  const { onDragEnd } = useDragEndDropHandler();

  const { mutate: createCardMutation, isPending } = useMutation({
    mutationFn: createCard,
    onSuccess: (card, { columnId }) => {
      addCard(columnId, card);
    },
  });

  const handleAddCard = (columnId: string) => {
    createCardMutation({ columnId });
  };

  const columns = board?.columns ?? [];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='board-columns' direction='horizontal'>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='w-full h-full flex items-start overflow-x-auto overflow-y-hidden gap-10 p-6 rounded-md border border-gray-200 bg-white'
          >
            {columns.map((column, index) => (
              <Draggable key={column.id} draggableId={column.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='text-texto min-w-60 w-60 min-h-70 max-h-full rounded-md flex flex-col items-center border border-gray-200 bg-white p-2'
                  >
                    <div className='font-semibold mb-2'>{column.title}</div>
                    <Droppable
                      droppableId={column.id}
                      direction='vertical'
                      type='card'
                    >
                      {(dropProvided) => (
                        <div
                          ref={dropProvided.innerRef}
                          {...dropProvided.droppableProps}
                          className='w-full flex-1 overflow-y-auto space-y-2 min-h-[60px] flex flex-col items-center justify-between'
                        >
                          <div className='flex flex-col gap-2  w-full h-full'>
                            {(column.cards ?? []).map((card, cardIndex) => (
                              <Card
                                key={card.id}
                                card={card}
                                index={cardIndex}
                                columnId={column.id}
                              />
                            ))}
                            {dropProvided.placeholder}
                          </div>

                          <Button
                            type='button'
                            variant='primary'
                            className='items-center justify-center gap-2 min-h-10'
                            disabled={isPending}
                            onClick={() => handleAddCard(column.id)}
                          >
                            <FaPlus size={16} />
                            <span>
                              {isPending ? 'Criando...' : 'Adicionar cartão'}
                            </span>
                          </Button>
                        </div>
                      )}
                    </Droppable>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
