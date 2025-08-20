import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (localStorage.getItem('token')) {
      throw redirect({
        to: '/boards',
      });
    }

    throw redirect({ to: '/login' });
  },
});
