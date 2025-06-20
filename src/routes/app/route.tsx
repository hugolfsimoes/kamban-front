import { Outlet } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import { useIsFetching } from '@tanstack/react-query';

export const Route = createFileRoute('/app')({
  component: App,
  beforeLoad: () => {
    // Verifica login
  },
});

function App() {
  const isFetching = useIsFetching();
  return (
    <div className='flex h-screen w-screen'>
      <div className='flex-1 flex flex-col bg-primary-bg'>
        <div className='flex-1 flex flex-col overflow-auto'>
          {isFetching > 0 && <span>Carregando</span>}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
