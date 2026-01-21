import { api } from '@/api/api';
import { IBoard } from '@/Interfaces/IBoard';

export async function getBoardById(boardId: string): Promise<IBoard> {
    const response = await api.get(`/boards/${boardId}`);
    console.log(response);

    return response.data.board as IBoard;
}
