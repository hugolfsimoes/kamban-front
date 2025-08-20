
import { api } from '@/api/api';
import { IBoard } from '@/Interfaces/IBoard';

export async function getBoards(): Promise<IBoard[]> {
  const response = await api.get('/boards');
  return response.data.boards as IBoard[];
}

