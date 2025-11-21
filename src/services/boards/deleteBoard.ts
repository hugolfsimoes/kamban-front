import { api } from '@/api/api';

export async function deleteBoard(boardId: string): Promise<void> {
  await api.delete(`/boards/${boardId}`);
}

