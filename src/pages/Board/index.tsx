import { useQuery } from '@tanstack/react-query';
import { getBoardById } from '@/services/boards';
import { Route } from '@/routes/_app/boards/$id';

export function Board() {
    const { id } = Route.useParams();

    const { data: board, isLoading, isError, error } = useQuery({
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
        <div className="flex flex-col gap-4">
            <div
                className="w-full h-32 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: board.color }}
            >
                <h1 className="text-2xl font-bold text-white">{board.name}</h1>
            </div>

            <div className="mt-4">
                <p>Board ID: {board.id}</p>
                {/* Aqui você pode adicionar o conteúdo do board, como colunas, cards, etc */}
            </div>
        </div>
    );
}
