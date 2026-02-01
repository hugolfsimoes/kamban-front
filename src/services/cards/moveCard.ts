import { api } from '@/api/api';

interface InputMoveCard {
  cardId: string;
  columnId: string;
  position: number;
}

export async function moveCard({
  cardId,
  columnId,
  position,
}: InputMoveCard): Promise<void> {
  await api.put(`/cards/${cardId}/move`, {
    columnId,
    position,
  });
}
