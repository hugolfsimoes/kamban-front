import Dashboard from '@/pages/Dashboard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/dashboard')({
  component: () => <Dashboard />,
  validateSearch: (search: Record<string, unknown>) => ({
    boardId: search.boardId,
  }),
});
