import { useCallback } from 'react';
import type { DropResult } from '@hello-pangea/dnd';
import { useBoardStore } from '@/stores/boardStore';

export type DragDropType = 'COLUMN' | 'CARD';

export const useDragEndDropHandler = (type: DragDropType) => {
  const reorderColumns = useBoardStore((state) => state.reorderColumns);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      if (result.source.index === result.destination.index) return;

      if (type === 'COLUMN') {
        reorderColumns(result.source.index, result.destination.index);
      }

      if (type === 'CARD') {
        // futuramente: reordenar cards dentro da coluna ou entre colunas
      }
    },
    [ type, reorderColumns ]
  );

  return { onDragEnd };
};