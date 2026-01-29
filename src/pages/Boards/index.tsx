import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CardBoard from './components/CardBoard';
import { getBoards, createBoard } from '@/services/boards';
import { CreateBoardModal } from './components/CreateBoardModal';
import { Content } from '@/components/Pages';

export function Boards() {
  const queryClient = useQueryClient();

  const {
    data: boards,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });

  const { mutate: handleCreateBoard, isPending: creating } = useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
    },
  });

  if (isLoading) return <p>Carregando seus boards...</p>;

  if (isError)
    return <p>Ocorreu um erro ao buscar os boards: {error.message}</p>;

  return (
    <Content>
      <div className='flex flex-col gap-8'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold mb-6'>Meus Quadros</h1>
          <CreateBoardModal />
        </div>

        {boards?.length === 0 ? (
          <div className='text-texto mt-6 text-center'>
            <p>Você ainda não criou nenhum quadro.</p>
            <p>Clique no botão "Novo quadro" para adicionar um novo quadro.</p>
          </div>
        ) : (
          <div className='flex flex-wrap  gap-4'>
            {boards?.map((board) => (
              <CardBoard board={board} key={board.id} />
            ))}
          </div>
        )}
      </div>
    </Content>
  );
}
