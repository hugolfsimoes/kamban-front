import { Board } from '@/pages/Board';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/boards/$id')({
  component: Board,
});
