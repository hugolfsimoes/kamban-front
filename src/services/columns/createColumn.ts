import { api } from '@/api/api';
import type { BoardColumnDTO } from '@/services/boards/getBoardById';

interface InputCreateColumn {
  boardId: string;
  title: string;
}

export async function createColumn({
  boardId,
  title,
}: InputCreateColumn): Promise<BoardColumnDTO> {
  const response = await api.post(`/columns`, {
    title,
    boardId
  });

  return response.data.column as BoardColumnDTO;
}
