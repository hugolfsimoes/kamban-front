import { api } from '@/api/api';
import type { CardDTO } from './types';

export type InputUpdateCard = Partial<Pick<CardDTO, 'title' | 'description' | 'position' | 'columnId'>> & {
  id: string;
};

export async function updateCard(card: InputUpdateCard): Promise<CardDTO> {
  const response = await api.put(`/cards/${card.id}`, {
    title: card.title,
    description: card.description,
    position: card.position,
    columnId: card.columnId,
  });

  return response.data.card as CardDTO;
}
