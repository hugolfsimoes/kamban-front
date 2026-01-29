import { api } from '@/api/api';
import { IBoard } from '@/Interfaces/IBoard';

export interface BoardColumnDTO {
    id: string;
    title: string;
    order: number;
}

export interface BoardDetailsDTO {
    id: string;
    name: string;
    color: string;
    organizationId: string;
    updatedAt: string;
    columns: BoardColumnDTO[];
}

export async function getBoardById(boardId: string): Promise<BoardDetailsDTO> {
    const response = await api.get(`/boards/${boardId}`);


    return response.data.board as BoardDetailsDTO;
}
