import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-[#12141c]/80 backdrop-blur-md border-b border-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={user ? (user.role === 'admin' ? '/admin/dashboard' : '/dashboard') : '/'} className="text-2xl font-bold tracking-tight">
          Career<span className="text-indigo-200">Test</span>
        </Link>
        <div>
          {user ? (
            <div className="flex items-center space-x-6">
              <span className="text-sm font-medium">Welcome, {user.name || user.username}</span>
              <button 
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all text-sm font-semibold backdrop-blur-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-6 text-sm font-semibold">
              <Link to="/" className="hover:text-indigo-200 transition-colors">Student Login</Link>
              <Link to="/admin" className="hover:text-indigo-200 transition-colors">Admin Login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
