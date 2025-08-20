import { Link, useNavigate } from '@tanstack/react-router';

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate({ to: '/login' });
  };

  return (
    <aside
      className='
      flex flex-col         
      w-60                 
      bg-primary-150
      text-white        
      pt-5          
      flex-shrink-0        
    '
    >
      <div className='sidebar-header text-center'>
        <h2 className='text-2xl font-bold'>Kamban</h2>
      </div>

      <nav className='flex-grow mt-10'>
        <ul className='list-none p-0 m-0'>
          <li className='text-white'>
            <Link
              to='/boards'
              className='
                block 
                py-2 px-4 
                rounded-md 
                text-white
                transition-colors duration-200
                hover:bg-white/20
              '
              activeProps={{ className: 'bg-white/20 font-semibold' }}
            >
              Boards
            </Link>
          </li>
          <li className='mb-2'>
            <Link
              to='/dashboard'
              className='
                block 
                py-2 px-4 
                rounded-md 
                text-white
                transition-colors duration-200
                hover:bg-white/20
              '
              activeProps={{ className: 'bg-white/20 font-semibold' }}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>

      <div className='mt-auto'>
        <button
          onClick={handleLogout}
          className='
            w-full 
            py-2 
            bg-primary-100
            rounded-md 
            font-bold 
            transition-colors duration-200
            cursor-pointer
          '
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
