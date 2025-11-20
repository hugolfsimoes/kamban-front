import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CardBoard from './components/CardBoard';
import { Button } from '@/components/Button';
import { getBoards, createBoard } from '@/services/boards';
import { CreateBoardModal } from './components/CreateBoardModal';

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
    <div>
      <h1 className="text-2xl font-bold mb-6">Meus Boards</h1>

      {boards?.length === 0 ? (
        <p className="text-gray-600 mb-4">Você ainda não criou nenhum board.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {boards?.map((board) => (
            <CardBoard board={board} key={board.id} />
          ))}
        </div>
      )}

      <div className="w-full flex items-center justify-center mt-6">
      <CreateBoardModal />
      </div>
    </div>
  );
}
