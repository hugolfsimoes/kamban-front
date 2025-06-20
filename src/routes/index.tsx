import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
  beforeLoad: () => {
    if (!localStorage.getItem('token')) {
      return redirect({ to: '/login', search: {} });
    } else {
      return redirect({
        to: '/app/dashboard',
        search: {
          teste: 'teste',
        },
      });
    }
  },
});

function Index() {
  return null;
}
