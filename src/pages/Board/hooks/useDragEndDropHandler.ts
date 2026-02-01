import { useCallback } from 'react';
import type { DropResult } from '@hello-pangea/dnd';
import { useBoardStore } from '@/stores/boardStore';

const BOARD_COLUMNS_DROPPABLE_ID = 'board-columns';

export const useDragEndDropHandler = () => {
  const reorderColumns = useBoardStore((state) => state.reorderColumns);
  const moveCard = useBoardStore((state) => state.moveCard);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (result.destination) {

        const isColumnDrag = result.source.droppableId === BOARD_COLUMNS_DROPPABLE_ID;

        if (isColumnDrag) {
          if (result.source.index === result.destination.index) return;
          reorderColumns(result.source.index, result.destination.index);

        } else {
          const sourceColumnId = result.source.droppableId;
          const destColumnId = result.destination.droppableId;
          const cardId = result.draggableId;
          const sourceIndex = result.source.index;
          const destIndex = result.destination.index;

          if (sourceColumnId === destColumnId && sourceIndex === destIndex) return;
          moveCard(cardId, sourceColumnId, sourceIndex, destColumnId, destIndex);
        }
      }
    },

    [ reorderColumns, moveCard ]
  );

  return { onDragEnd };
};