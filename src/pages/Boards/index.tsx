import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { boardService } from '@/services/boards/boards.service';

// Local do arquivo: src/routes/_app/boards.tsx

// ... (imports e definição da rota ficam iguais) ...

export function Boards() {
  const navigate = useNavigate();

  const {
    data: boards, // `boards` aqui é o objeto { boards: [...] }
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['boards'],
    queryFn: boardService.getBoards,
  });

  if (isLoading) {
    return <p>Carregando seus boards...</p>;
  }

  if (isError) {
    return <p>Ocorreu um erro ao buscar os boards: {error.message}</p>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Meus Boards</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {boards?.map((board) => (
          <button
            key={board.id}
            onClick={() =>
              navigate({
                to: `/boards/${board.id}`,
              })
            }
            className='border p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-left'
          >
            <h3 className='font-semibold'>{board.nome}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}
