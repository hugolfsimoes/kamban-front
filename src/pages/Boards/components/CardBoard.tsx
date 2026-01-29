import { useRef } from 'react';
import { IBoard } from '@/Interfaces/IBoard';
import { useNavigate } from '@tanstack/react-router';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { DeleteBoardModal } from './DeleteBoardModal';
import { Tooltip } from '@/components/Tooltip';
import { EditBoardModal } from './EditBoardModal';
import type { ModalRootWithContextRef } from '@/components/Modal';
import { formatRelativeDate } from '@/utils/formatRelativeDate';
import { GetBoardsOutput } from '@/services/boards/getBoards';

type CardBoardProps = {
  board: GetBoardsOutput;
};

export default function CardBoard({ board }: CardBoardProps) {
  const navigate = useNavigate();
  const editModalRef = useRef<ModalRootWithContextRef>(null);
  const deleteModalRef = useRef<ModalRootWithContextRef>(null);

  const openEditModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    editModalRef.current?.open();
  };

  const openDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteModalRef.current?.open();
  };

  const handleCardClick = () => {
    navigate({
      to: `/boards/${board.id}`,
    });
  };

  return (
    <button
      key={board.id}
      type='button'
      onClick={handleCardClick}
      className='
    group flex flex-col justify-between w-80 h-44 p-5 rounded-xl border border-gray-200 bg-white text-left transition hover:border-primary-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-100/30 cursor-pointer'
    >
      <div className='flex items-center justify-between gap-4'>
        <div className='flex items-center gap-2 min-w-0'>
          <div
            className='h-4 w-4 rounded-full min-w-4 min-h-4'
            style={{ backgroundColor: board.color }}
          />
          <Tooltip.SimpleComponent text={board.name} className='max-w-64'>
            <h3 className='font-semibold text-texto truncate'>{board.name}</h3>
          </Tooltip.SimpleComponent>
        </div>

        <div className='flex'>
          <EditBoardModal ref={editModalRef} board={board} />
          <Tooltip.SimpleComponent text='Editar board'>
            <button
              type='button'
              className='cursor-pointer p-1 rounded text-texto hover:text-primary-100'
              onClick={openEditModal}
            >
              <FaRegEdit size={16} />
            </button>
          </Tooltip.SimpleComponent>
          <DeleteBoardModal ref={deleteModalRef} board={board} />
          <Tooltip.SimpleComponent
            text='Excluir quadro'
            className='max-w-full'
            color='danger'
          >
            <button
              type='button'
              className='cursor-pointer p-1 rounded text-texto transition-colors hover:text-red-400'
              onClick={openDeleteModal}
            >
              <FaTrash size={16} />
            </button>
          </Tooltip.SimpleComponent>
        </div>
      </div>
      <div className='flex flex-col text-texto text-xs items-start'>
        Atualizado {formatRelativeDate(board.updatedAt)}
        <span>
          Contém {board.columnsCount} colunas e {board.cardsCount} cards
        </span>
      </div>
    </button>
  );
}
