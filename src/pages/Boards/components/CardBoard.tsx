import { IBoard } from '@/Interfaces/IBoard';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

type CardBoardProps = {
  board: IBoard;
};

export default function CardBoard({ board }: CardBoardProps) {
  const navigate = useNavigate();
  return (
    <button
      key={board.id}
      onClick={() =>
        navigate({
          to: `/boards/${board.id}`,
        })
      }
      className='border p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-left cursor-pointer'
    >
      <h3 className='font-semibold'>{board.name}</h3>
    </button>
  );
}
