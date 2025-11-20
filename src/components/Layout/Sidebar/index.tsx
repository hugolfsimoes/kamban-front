import { Link, useNavigate } from '@tanstack/react-router';
import { NavItem } from './components/NavItem';

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate({ to: '/login' });
  };

  return (
    <aside
      className="
        flex flex-col
        w-60
        bg-primary-100 text-white
        px-4 py-6
        border-r border-white/10
        flex-shrink-0
      "
    >
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Kamban</h2>
      </div>

      
      <nav className="flex-1">
        <ul className="space-y-1">
          <NavItem label="Boards" to="/_app/boards" />
          <NavItem label="Dashboard" to="/_app/dashboard" />
        </ul>
      </nav>

      {/* Logout */}
      <div>
        <button
          onClick={handleLogout}
          className="
            w-full py-2
            bg-primary-100 hover:bg-primary-200
            rounded-md
            font-semibold
            transition-colors
          "
        >
          Logout
        </button>
      </div>
    </aside>
  );
}



