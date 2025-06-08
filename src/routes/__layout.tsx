import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import type { RouterContext } from '@/types/router-context';
import '../index.css';

// Criação do router
const router = createRouter({
  routeTree,
  context: {} as RouterContext,
});

// ⛳ ESTA PARTE É ESSENCIAL:
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
    context: RouterContext; // ✅ Aqui é o que faltava
  }
}

function App() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

const rootElement = document.getElementById('root')!;
ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
