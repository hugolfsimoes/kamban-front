import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { Sidebar } from '@/components/Layout/Sidebar';

function AppLayout() {
  return (
    <div className='flex h-screen w-screen overflow-hidden bg-gray-50'>
      <Sidebar />
      <main className='flex-1 overflow-hidden'>
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
