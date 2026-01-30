import { api } from '@/api/api';
import type { BoardColumnDTO } from '@/services/boards/getBoardById';

export type InputUpdateColumn = BoardColumnDTO;

export async function updateColumn(
  column: InputUpdateColumn
): Promise<BoardColumnDTO> {
  const response = await api.put(`/columns/${column.id}`, {
    title: column.title,
    order: column.order,
  });

  return response.data.column as BoardColumnDTO;
}
