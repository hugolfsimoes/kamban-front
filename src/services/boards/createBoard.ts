
import { api } from '@/api/api';
import { IBoard } from '@/Interfaces/IBoard';

interface InputCreateBoard {
  name: string;
}

export async function createBoard({ name }: InputCreateBoard): Promise<void> {
  const response = await api.post('/boards', {
    name
  });
}

