import { useContext, useState, useEffect } from 'react';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './icon';
import Avatar from './avatar';
import { AuthContext } from '../contaxt/AuthContaxt';

function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Redirect non-admin from Admin link
  useEffect(() => {
    if (user && user.email !== "rameez@gmail.com") {
      // optional redirect logic
      // navigate('/');
    }
  }, [user, navigate]);

  return (
    <header className="bg-white shadow-md overflow-hidden border-b-2">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Links */}
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-200 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <Icon />
            </button>

            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/products" className="nav-link">Products</Link>
                <Link to="/about" className="nav-link">About</Link>

                {user && user.email === "rameez@gmail.com" && (
                  <Link to="/admin/userManage" className="nav-link">Admin</Link>
                )}
              </div>
            </div>
          </div>

          {/* User Login/Avatar */}
          <div className="flex space-x-4">
            {user && user.isLogin ? (
              <Avatar src={user.photoUrl || '/default-avatar.png'} className="h-10 w-10 rounded-full object-cover sm:h-8 sm:w-8" />
            ) : (
              <Link to="/login">
                <Button type="default" className="bg-gray-100 hover:bg-gray-200">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${menuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block nav-link-mobile">Home</Link>
          <Link to="/products" className="block nav-link-mobile">Products</Link>
          <Link to="/about" className="block nav-link-mobile">About</Link>
          {user && user.email === "rameez@gmail.com" && (
            <Link to="/admin/userManage" className="block nav-link-mobile">Admin</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
