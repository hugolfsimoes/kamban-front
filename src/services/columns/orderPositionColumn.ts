import { api } from '@/api/api';

interface InputOrderPositionColumn {
  boardId: string;
  sourcePosition: number;
  destinationPosition: number;
}

export async function orderPositionColumn({
  boardId,
  sourcePosition,
  destinationPosition,
}: InputOrderPositionColumn): Promise<void> {
  await api.put(`/columns/order`, {
    boardId,
    sourcePosition,
    destinationPosition,
  });
}
