import { createFileRoute } from '@tanstack/react-router';
import { Boards } from '@/pages/Boards'; // Importa o componente

export const Route = createFileRoute('/_app/boards')({
  component: Boards,
});
