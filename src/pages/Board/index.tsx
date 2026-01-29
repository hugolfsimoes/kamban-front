import { useQuery } from '@tanstack/react-query';
import { getBoardById } from '@/services/boards';
import { Route } from '@/routes/_app/boards/$id';
import { CreateColumnModal } from './components/CreateColumnModal';
import { Content } from '@/components/Pages';

export function Board() {
  const { id } = Route.useParams();

  const {
    data: board,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['board', id],
    queryFn: () => getBoardById(id),
  });

  if (isLoading) {
    return <p>Carregando board...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar board: {error?.message}</p>;
  }

  if (!board) {
    return <p>Board não encontrado</p>;
  }

  return (
    <Content>
      <div className='flex items-center justify-between  mb-6'>
        <h1 className='text-2xl font-bold mb-6'>{board.name}</h1>
        <CreateColumnModal boardId={id} />
      </div>

      {board?.columns.length === 0 ? (
        <div className='text-texto mt-6 text-center'>
          <p>Você ainda não criou nenhuma coluna.</p>
        </div>
      ) : (
        <div className='flex-1 overflow-hidden'>
          <div className='w-full h-full overflow-x-auto overflow-y-hidden flex gap-10 p-6 rounded-md border border-gray-200 bg-white p-2'>
            {board?.columns.map((column) => {
              return (
                <div
                  key={column.id}
                  className='text-texto  min-w-40 w-50 h-fit rounded-md flex flex-col items-center border border-gray-200 bg-white p-2'
                >
                  <div className='font-semibold mb-2'>{column.title}</div>
                  <div className='flex-1 overflow-y-auto'>
                    {/* cards da coluna */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Content>
  );
}
