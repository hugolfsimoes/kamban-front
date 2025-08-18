// Em src/routes/login.tsx
import { createFileRoute, redirect } from '@tanstack/react-router';
import Login from '@/pages/Login';

export const Route = createFileRoute('/login')({
  component: () => <Login />,

  // ---> AJUSTE PRINCIPAL AQUI <---
  // Esta verificação impede que um usuário LOGADO veja a página de login.
  beforeLoad: () => {
    if (localStorage.getItem('token')) {
      throw redirect({
        to: '/boards', // ou para a rota principal que preferir
      });
    }
  },

  head: () => ({
    meta: [
      {
        title: 'Login',
      },
    ],
  }),
});
