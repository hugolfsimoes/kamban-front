import { create } from 'zustand';
import type { BoardDetailsDTO, BoardColumnDTO } from '@/services/boards/getBoardById';
import { orderPositionColumn } from '@/services/columns';

type BoardState = {
  board: BoardDetailsDTO | null;
  setBoard: (board: BoardDetailsDTO | null) => void;
  reorderColumns: (sourceIndex: number, destinationIndex: number) => void;
  setColumns: (columns: BoardColumnDTO[]) => void;
};

export const useBoardStore = create<BoardState>((set, get) => ({
  board: null,

  setBoard: (board) => set({ board }),

  reorderColumns: (sourceIndex, destinationIndex) => {
    const boardId = get().board?.id;

    set((state) => {
      if (!state.board) return state;
      const columns = [ ...state.board.columns ];
      const [ removed ] = columns.splice(sourceIndex, 1);
      columns.splice(destinationIndex, 0, removed);
      const columnsWithNewOrder = columns.map((col, index) => ({
        ...col,
        order: index,
      }));
      return {
        board: {
          ...state.board,
          columns: columnsWithNewOrder,
        },
      };
    });

    if (boardId) {
      orderPositionColumn({
        boardId,
        sourcePosition: sourceIndex,
        destinationPosition: destinationIndex,
      }).catch(console.error);
    }
  },

  setColumns: (columns) =>
    set((state) => {
      if (!state.board) return state;
      return {
        board: {
          ...state.board,
          columns,
        },
      };
    }),
}));
