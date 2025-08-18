// Em: src/routes/__root.tsx (ESTE É O LUGAR CORRETO)

import { createRootRoute, Outlet } from '@tanstack/react-router';

// Você pode adicionar DevTools aqui se quiser
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      {/* O Outlet renderiza todas as outras rotas filhas */}
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
