
import { api } from '@/api/api';

export interface Board {
  id: string;
  nome: string;
}

export const boardService = {
  async getBoards(): Promise<Board[]> {
    const response = await api.get('/boards');
    return response.data;
  },
};