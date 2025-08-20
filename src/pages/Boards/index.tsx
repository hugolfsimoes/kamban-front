import { useQuery } from '@tanstack/react-query';
import CardBoard from './components/CardBoard';
import { Button } from '@/components/Button';
import { getBoards, createBoard } from '@/services/boards';
export function Boards() {
  const {
    data: boards,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
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
          <CardBoard board={board} key={board.id} />
        ))}
      </div>

      <div className='w-full flex items-center justify-center mt-6'>
        <Button
          variant='primary'
          size='lg'
          type='button'
          onClick={() => createBoard({ name: 'Criar Board' })}
        >
          Criar Board
        </Button>
      </div>
    </div>
  );
}
