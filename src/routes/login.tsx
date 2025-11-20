
import { createFileRoute, redirect } from '@tanstack/react-router';
import Login from '@/pages/Login';

export const Route = createFileRoute('/login')({
  component: () => <Login />,

  beforeLoad: () => {
    if (localStorage.getItem('token')) {
      throw redirect({
        to: '/boards',
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
