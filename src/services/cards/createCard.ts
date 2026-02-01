import { api } from '@/api/api';
import type { CardDTO } from './types';

interface InputCreateCard {
  columnId: string;
  title?: string;
  description?: string;
}

export async function createCard({
  columnId,
  title = '',
  description = '',
}: InputCreateCard): Promise<CardDTO> {
  const response = await api.post('/cards', {
    columnId,
    title,
    description,
  });

  return response.data.card as CardDTO;
}
