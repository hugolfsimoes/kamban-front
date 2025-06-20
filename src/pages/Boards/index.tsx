import { useQuery } from '@tanstack/react-query';
import { boardService } from '@/services/boards/boards.service';
import { useNavigate } from '@tanstack/react-router';

export default function BoardsPage() {
  const navigate = useNavigate();
  const { data: boards, isLoading } = useQuery({
    queryKey: ['boards'],
    queryFn: boardService.getBoards,
  });

  if (isLoading) return <p>Carregando...</p>;

  if (!boards?.length)
    return (
      <div className='text-center'>
        <p>Você ainda não tem nenhum board.</p>
        <button className='btn-primary mt-4'>Criar novo board</button>
      </div>
    );

  return (
    <div className='grid gap-4'>
      {boards?.map((board) => (
        <button
          key={board.id}
          onClick={() =>
            navigate({
              to: '/app/dashboard',
              search: { boardId: board.id },
            })
          }
          className='border p-4 rounded hover:bg-gray-50'
        >
          {board.nome}
        </button>
      ))}
    </div>
  );
}
