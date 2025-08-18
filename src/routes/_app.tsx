import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { Sidebar } from '@/components/Layout/Sidebar';

// O componente do Layout que contém a estrutura visual
function AppLayout() {
  return (
    <div className='layout-container'>
      <Sidebar />
      <main className='content-container'>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createFileRoute('/_app')({
  component: AppLayout,
  beforeLoad: ({ location }) => {
    if (!localStorage.getItem('token')) {
      throw redirect({ to: '/login' });
    }
  },
});
