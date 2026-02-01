import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { BoardDetailsDTO, BoardColumnDTO } from '@/services/boards/getBoardById';
import type { CardDTO } from '@/services/cards/types';

vi.mock('@/services/columns', () => ({
  orderPositionColumn: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/services/cards', () => ({
  moveCard: vi.fn().mockResolvedValue(undefined),
}));

const { useBoardStore } = await import('./boardStore');

function createMockCard(overrides: Partial<CardDTO> = {}): CardDTO {
  return {
    id: 'card-1',
    title: 'Card 1',
    description: '',
    position: 0,
    creatorId: 'user-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

function createMockColumn(overrides: Partial<BoardColumnDTO> = {}): BoardColumnDTO {
  return {
    id: 'col-1',
    title: 'Coluna 1',
    order: 0,
    cards: [],
    ...overrides,
  };
}

function createMockBoard(overrides: Partial<BoardDetailsDTO> = {}): BoardDetailsDTO {
  const col1 = createMockColumn({
    id: 'col-1',
    title: 'To Do',
    order: 0,
    cards: [
      createMockCard({ id: 'card-1', title: 'Card 1', position: 0 }),
      createMockCard({ id: 'card-2', title: 'Card 2', position: 1 }),
    ],
  });
  const col2 = createMockColumn({
    id: 'col-2',
    title: 'Done',
    order: 1,
    cards: [ createMockCard({ id: 'card-3', title: 'Card 3', position: 0 }) ],
  });
  return {
    id: 'board-1',
    name: 'Board 1',
    color: '#333',
    organizationId: 'org-1',
    updatedAt: new Date().toISOString(),
    columns: [ col1, col2 ],
    ...overrides,
  };
}

function getStore() {
  return useBoardStore.getState();
}

beforeEach(() => {
  useBoardStore.setState({ board: null });
});

describe('boardStore', () => {
  describe('setBoard', () => {
    it('define o board no estado', () => {
      const board = createMockBoard();
      getStore().setBoard(board);
      expect(getStore().board).toEqual(board);
    });

    it('limpa o board quando recebe null', () => {
      getStore().setBoard(createMockBoard());
      getStore().setBoard(null);
      expect(getStore().board).toBeNull();
    });
  });

  describe('reorderColumns', () => {
    it('reordena as colunas e atualiza order', () => {
      const board = createMockBoard();
      getStore().setBoard(board);
      getStore().reorderColumns(0, 1);
      const state = getStore().board!;
      expect(state.columns[ 0 ].id).toBe('col-2');
      expect(state.columns[ 1 ].id).toBe('col-1');
      expect(state.columns[ 0 ].order).toBe(0);
      expect(state.columns[ 1 ].order).toBe(1);
    });

    it('não altera o estado quando board é null', () => {
      getStore().reorderColumns(0, 1);
      expect(getStore().board).toBeNull();
    });
  });

  describe('setColumns', () => {
    it('substitui as colunas do board', () => {
      const board = createMockBoard();
      getStore().setBoard(board);
      const newColumns = [
        createMockColumn({ id: 'new-1', title: 'Nova', order: 0, cards: [] }),
      ];
      getStore().setColumns(newColumns);
      expect(getStore().board!.columns).toEqual(newColumns);
    });

    it('não altera o estado quando board é null', () => {
      getStore().setColumns([ createMockColumn() ]);
      expect(getStore().board).toBeNull();
    });
  });

  describe('addCard', () => {
    it('adiciona cartão à coluna com position correta', () => {
      const board = createMockBoard();
      getStore().setBoard(board);
      const newCard = createMockCard({ id: 'card-new', title: 'Novo' });
      getStore().addCard('col-1', newCard);
      const col = getStore().board!.columns.find((c) => c.id === 'col-1')!;
      expect(col.cards).toHaveLength(3);
      expect(col.cards[ 2 ].id).toBe('card-new');
      expect(col.cards[ 2 ].position).toBe(2);
      expect(col.cards[ 2 ].columnId).toBe('col-1');
    });

    it('não altera o estado quando board é null', () => {
      getStore().addCard('col-1', createMockCard());
      expect(getStore().board).toBeNull();
    });
  });

  describe('removeCard', () => {
    it('remove o cartão da coluna e renumera positions', () => {
      const board = createMockBoard();
      getStore().setBoard(board);
      getStore().removeCard('col-1', 'card-1');
      const col = getStore().board!.columns.find((c) => c.id === 'col-1')!;
      expect(col.cards).toHaveLength(1);
      expect(col.cards[ 0 ].id).toBe('card-2');
      expect(col.cards[ 0 ].position).toBe(0);
    });

    it('não altera o estado quando board é null', () => {
      getStore().removeCard('col-1', 'card-1');
      expect(getStore().board).toBeNull();
    });
  });

  describe('updateCardInStore', () => {
    it('atualiza title e description do cartão', () => {
      const board = createMockBoard();
      getStore().setBoard(board);
      getStore().updateCardInStore('card-1', {
        title: 'Título novo',
        description: 'Descrição nova',
      });
      const col = getStore().board!.columns.find((c) => c.id === 'col-1')!;
      const card = col.cards.find((c) => c.id === 'card-1')!;
      expect(card.title).toBe('Título novo');
      expect(card.description).toBe('Descrição nova');
    });

    it('não altera o estado quando board é null', () => {
      getStore().updateCardInStore('card-1', { title: 'X' });
      expect(getStore().board).toBeNull();
    });
  });

  describe('moveCard', () => {
    it('reordena cartão na mesma coluna', () => {
      const board = createMockBoard();
      getStore().setBoard(board);
      getStore().moveCard('card-1', 'col-1', 0, 'col-1', 1);
      const col = getStore().board!.columns.find((c) => c.id === 'col-1')!;
      expect(col.cards[ 0 ].id).toBe('card-2');
      expect(col.cards[ 1 ].id).toBe('card-1');
      expect(col.cards[ 0 ].position).toBe(0);
      expect(col.cards[ 1 ].position).toBe(1);
    });

    it('move cartão de uma coluna para outra', () => {
      const board = createMockBoard();
      getStore().setBoard(board);
      getStore().moveCard('card-1', 'col-1', 0, 'col-2', 1);
      const col1 = getStore().board!.columns.find((c) => c.id === 'col-1')!;
      const col2 = getStore().board!.columns.find((c) => c.id === 'col-2')!;
      expect(col1.cards).toHaveLength(1);
      expect(col1.cards[ 0 ].id).toBe('card-2');
      expect(col2.cards).toHaveLength(2);
      expect(col2.cards[ 1 ].id).toBe('card-1');
      expect(col2.cards[ 1 ].columnId).toBe('col-2');
      expect(col2.cards[ 1 ].position).toBe(1);
    });

    it('não altera o estado quando board é null', () => {
      getStore().moveCard('card-1', 'col-1', 0, 'col-2', 0);
      expect(getStore().board).toBeNull();
    });

    it('não altera o estado quando cartão não existe na coluna de origem', () => {
      const board = createMockBoard();
      getStore().setBoard(board);
      const columnsBefore = JSON.stringify(board.columns);
      getStore().moveCard('card-1', 'col-1', 99, 'col-2', 0);
      expect(JSON.stringify(getStore().board!.columns)).toBe(columnsBefore);
    });
  });
});
