import { api } from '@/api/api';
import { IBoard } from '@/Interfaces/IBoard';

interface InputUpdateBoard {
  id: string;
  name: string;
  color: string;
}

export async function updateBoard({
  id,
  name,
  color,
}: InputUpdateBoard): Promise<IBoard> {
  const response = await api.patch(`/boards/${id}`, {
    name,
    color,
  });

  return response.data.board as IBoard;
}