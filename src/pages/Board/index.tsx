import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBoardById } from '@/services/boards';
import { Route } from '@/routes/_app/boards/$id';
import { CreateColumnModal } from './components/CreateColumnModal';
import { Page } from '@/components/Pages';
import { BoardColumns } from './BoardColumns';
import { useBoardStore } from '@/stores/boardStore';

export function Board() {
  const { id } = Route.useParams();
  const { board, setBoard } = useBoardStore();

  const {
    data: boardFromQuery,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['board', id],
    queryFn: () => getBoardById(id),
  });

  useEffect(() => {
    if (!id) return;
    setBoard(null);
  }, [id, setBoard]);

  useEffect(() => {
    if (boardFromQuery && boardFromQuery.id === id) {
      setBoard(boardFromQuery);
    }
  }, [boardFromQuery, id, setBoard]);

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
    <Page.Container>
      <div className='flex items-center justify-between  mb-6'>
        <h1 className='text-2xl font-bold'>{board.name}</h1>
        <CreateColumnModal boardId={id} />
      </div>

      {board.columns.length === 0 ? (
        <div className='text-texto mt-6 text-center'>
          <p>Você ainda não criou nenhuma coluna.</p>
        </div>
      ) : (
        <BoardColumns />
      )}
    </Page.Container>
  );
}
