import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';

function ProtectedRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to='/login' />;
}

const router = createBrowserRouter([{ path: '/login', element: <Login /> }]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
