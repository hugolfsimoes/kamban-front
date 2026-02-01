import { create } from 'zustand';
import type { BoardDetailsDTO, BoardColumnDTO } from '@/services/boards/getBoardById';
import type { CardDTO } from '@/services/cards/types';
import { orderPositionColumn } from '@/services/columns';
import { moveCard as moveCardService } from '@/services/cards';

type BoardState = {
  board: BoardDetailsDTO | null;
  setBoard: (board: BoardDetailsDTO | null) => void;
  reorderColumns: (sourceIndex: number, destinationIndex: number) => void;
  setColumns: (columns: BoardColumnDTO[]) => void;
  moveCard: (
    cardId: string,
    sourceColumnId: string,
    sourceIndex: number,
    destColumnId: string,
    destIndex: number
  ) => void;
  addCard: (columnId: string, card: CardDTO) => void;
  removeCard: (columnId: string, cardId: string) => void;
  updateCardInStore: (cardId: string, updates: Partial<Pick<CardDTO, 'title' | 'description'>>) => void;
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

  moveCard: (
    cardId,
    sourceColumnId,
    sourceIndex,
    destColumnId,
    destIndex,
  ) => {
    set((state) => {
      if (!state.board) return state;

      const sourceColumn = state.board.columns.find((c) => c.id === sourceColumnId);
      const removed = sourceColumn?.cards[ sourceIndex ];
      if (!removed) return state;

      const columns = state.board.columns.map((col) => {

        if (sourceColumnId === destColumnId && col.id === sourceColumnId) {
          const cards = [ ...col.cards ];
          const [ moved ] = cards.splice(sourceIndex, 1);
          cards.splice(destIndex, 0, moved);

          return {
            ...col,
            cards: cards.map((c, i) => ({ ...c, position: i })),
          };
        }


        if (col.id === sourceColumnId) {
          return {
            ...col,
            cards: col.cards
              .filter((_, i) => i !== sourceIndex)
              .map((c, i) => ({ ...c, position: i })),
          };
        }


        if (col.id === destColumnId) {
          const cards = [ ...col.cards ];
          cards.splice(destIndex, 0, {
            ...removed,
            columnId: destColumnId,
            position: destIndex,
          });

          return {
            ...col,
            cards: cards.map((c, i) => ({ ...c, position: i })),
          };
        }

        return col;
      });

      return {
        board: {
          ...state.board,
          columns,
        },
      };
    });

    moveCardService({
      cardId,
      columnId: destColumnId,
      position: destIndex,
    }).catch(console.error);
  },


  addCard: (columnId, card) => {
    set((state) => {
      if (!state.board) return state;
      const newColumns = state.board.columns.map((col) => {
        if (col.id !== columnId) return col;
        const newCards = [ ...col.cards, { ...card, columnId, position: col.cards.length } ];
        return { ...col, cards: newCards };
      });
      return {
        board: {
          ...state.board,
          columns: newColumns,
        },
      };
    });
  },

  removeCard: (columnId, cardId) => {
    set((state) => {
      if (!state.board) return state;
      const newColumns = state.board.columns.map((col) => {
        if (col.id !== columnId) return col;
        const newCards = col.cards
          .filter((c) => c.id !== cardId)
          .map((c, i) => ({ ...c, position: i }));
        return { ...col, cards: newCards };
      });
      return {
        board: {
          ...state.board,
          columns: newColumns,
        },
      };
    });
  },

  updateCardInStore: (cardId, updates) => {
    set((state) => {
      if (!state.board) return state;
      const newColumns = state.board.columns.map((col) => ({
        ...col,
        cards: col.cards.map((c) =>
          c.id === cardId ? { ...c, ...updates } : c
        ),
      }));
      return {
        board: {
          ...state.board,
          columns: newColumns,
        },
      };
    });
  },
}));
