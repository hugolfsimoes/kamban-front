import { createFileRoute } from '@tanstack/react-router';

// O tipo do search param é definido aqui para ter type-safety!
export const Route = createFileRoute('/_app/dashboard')({
  // Valida e tipa os parâmetros de busca da URL
  validateSearch: (search: Record<string, unknown>): { boardId?: string } => {
    return {
      boardId: search.boardId as string,
    };
  },
  component: DashboardPage,
});

function DashboardPage() {
  // Pega o boardId da URL de forma segura
  const { boardId } = Route.useSearch();

  return (
    <div>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '2rem' }}>
        Dashboard
      </h1>
      {boardId ? (
        <p>
          Mostrando o dashboard para o Board ID: <strong>{boardId}</strong>
        </p>
      ) : (
        <p>Nenhum board selecionado.</p>
      )}
      <p>Aqui você vai construir o seu quadro Kanban!</p>
    </div>
  );
}
