
import { api } from '@/api/api';
import { IBoard } from '@/Interfaces/IBoard';

interface InputCreateBoard {
  name: string;
  color:string
}

export async function createBoard({ name,color }: InputCreateBoard): Promise<IBoard[]> {
  const response = await api.post('/boards', {
    name,
    color
  });

  
  return response.data.board as IBoard[];
}

