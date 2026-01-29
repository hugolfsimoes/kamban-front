
import { api } from '@/api/api';
import { IBoard } from '@/Interfaces/IBoard';

export interface GetBoardsOutput extends IBoard {
  columnsCount: number;
  cardsCount: number;
}

export async function getBoards(): Promise<GetBoardsOutput[]> {
  const response = await api.get('/boards');

  return response.data.boards as GetBoardsOutput[];
}

