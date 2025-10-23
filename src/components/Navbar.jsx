import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: '🏠 Beranda', icon: '🏠' },
    { path: '/add', label: '➕ Tambah', icon: '➕' },
    { path: '/report', label: '📊 Laporan', icon: '📊' },
    { path: '/settings', label: '⚙️ Pengaturan', icon: '⚙️' },
  ];

  return (
    <nav className="glass-effect border-b border-white/20 bg-white/10 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-white text-shadow">💰 Keuangan Harian</h1>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${
                    location.pathname === item.path ? 'nav-link-active' : 'nav-link-inactive'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white font-medium">👤 {user?.username}</span>
            <button
              onClick={logout}
              className="btn-secondary text-sm"
            >
              🚪 Logout
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div className="md:hidden pb-6">
          <div className="flex space-x-3 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link whitespace-nowrap ${
                  location.pathname === item.path ? 'nav-link-active' : 'nav-link-inactive'
                }`}
              >
                {item.icon} {item.label.split(' ')[1]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
