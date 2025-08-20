import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { Sidebar } from '@/components/Layout/Sidebar';

function AppLayout() {
  return (
    <div className='w-full h-full flex'>
      <Sidebar />
      <main className='p-6 w-full'>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createFileRoute('/_app')({
  component: AppLayout,
  beforeLoad: () => {
    if (!localStorage.getItem('token')) {
      throw redirect({ to: '/login' });
    }
  },
});
