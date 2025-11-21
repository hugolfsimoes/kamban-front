import { IBoard } from '@/Interfaces/IBoard';
import { useNavigate } from '@tanstack/react-router';
import { FaDoorOpen, FaTrash } from "react-icons/fa6";
import { DeleteBoardModal } from './DeleteBoardModal';

type CardBoardProps = {
  board: IBoard;
};

export default function CardBoard({ board }: CardBoardProps) {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // Verifica se há um modal aberto no momento
    const openModalContent = document.querySelector('[data-radix-dialog-content][data-state="open"]');

    // Se há um modal aberto E o clique foi dentro dele, não navega
    if (openModalContent) {
      const clickedInModalContent = target.closest('[data-radix-dialog-content]');
      const clickedInModalOverlay = target.closest('[data-radix-dialog-overlay]');

      if (clickedInModalContent || clickedInModalOverlay) {
        return;
      }
    }

    // Verifica se o clique foi no botão de trash usando o atributo data
    const clickedOnTrashButton = target.closest('[data-trash-button]');
    if (clickedOnTrashButton) {
      return;
    }

    // Navega normalmente
    navigate({
      to: `/boards/${board.id}`,
    });
  };

  return (
    <button
      key={board.id}
      type='button'
      onClick={handleCardClick}
      className='flex flex-col border rounded-lg overflow-hidden transition-all cursor-pointer text-white w-64 h-32 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] hover:scale-[1.02]'

    >
      <div className='w-full h-[30%] rounded-t-lg flex items-center justify-end' style={{ backgroundColor: board.color }} >
        <DeleteBoardModal board={board}>
          <button
            data-trash-button
            className='mr-4 cursor-pointer p-1 hover:bg-white/20 rounded transition-colors'
            onClick={(e) => e.stopPropagation()}
          >
            <FaTrash size={16} color='white' />
          </button>
        </DeleteBoardModal>
      </div>

      <div className='flex items-center justify-between px-4 h-[70%]'>
        <h3 className='font-semibold text-[#172b4d]'>{board.name}</h3>
        <FaDoorOpen size={16} color='#172b4d' />
      </div>
    </button>
  );
}
