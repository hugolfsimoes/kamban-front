import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useBoardStore } from '@/stores/boardStore';
import { useDragEndDropHandler } from '../hooks/useDragEndDropHandler';

export function BoardColumns() {
  const board = useBoardStore((state) => state.board);
  const { onDragEnd } = useDragEndDropHandler('COLUMN');

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
                    <div className='overflow-y-auto'>
                      {/* cards futuramente */}
                    </div>
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
