import { createFileRoute } from '@tanstack/react-router';
import { Boards } from '@/pages/Boards';

export const Route = createFileRoute('/_app/boards/')({
  component: Boards,
});
