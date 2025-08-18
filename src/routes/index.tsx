// Em src/routes/index.tsx
// Este arquivo está CORRETO para o seu objetivo. Não precisa mudar.
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  // Esta função roda antes de qualquer coisa na rota '/'
  beforeLoad: () => {
    // Se o usuário já está logado, vai direto para os boards
    if (localStorage.getItem('token')) {
      throw redirect({
        to: '/boards',
      });
    }
    // Se não, vai para a página de login
    throw redirect({ to: '/login' });
  },
});
