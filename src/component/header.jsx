import { useContext, useState } from 'react';
import Icon from './icon'; // Assuming this is your custom icon
import { Button } from 'antd';
import Avatar from './avatar';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contaxt/AuthContaxt';

function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-md overflow-hidden border-b-2">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo and Links */}
          <div className="flex items-center">
            {/* Mobile Menu Icon (Your custom Icon) */}
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
                <Link
                  to="/"
                  className="relative text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:text-black group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 ease-in-out group-hover:w-full"></span>
                </Link>
                <Link
                  to="/products"
                  className="relative text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:text-black group"
                >
                  products
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 ease-in-out group-hover:w-full"></span>
                </Link>
                <Link
                  to="/about"
                  className="relative text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:text-black group"
                >
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 ease-in-out group-hover:w-full"></span>
                </Link>
                <Link
                  to="/admin/userManage"
                  className="relative text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:text-black group"
                >
                  Admin
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 ease-in-out group-hover:w-full"></span>
                </Link>
              </div>
            </div>
          </div>

          {/* User Login/Avatar Section */}
          <div className="flex flex-row space-x-4">
            {user && user.isLogin ? (
              <>
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <Avatar
                    src={user.photoUrl || '/default-avatar.png'}
                    className="h-10 w-10 rounded-full object-cover sm:h-8 sm:w-8"
                  />
                </div>
              </>
            ) : (
              <Link to="/login">
                <Button type="default" className="bg-gray-100 hover:bg-gray-200">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${menuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block text-gray-700 hover:text-black px-3 py-2 rounded-md text-base font-medium hover:underline"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block text-gray-700 hover:text-black px-3 py-2 rounded-md text-base font-medium hover:underline"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="block text-gray-700 hover:text-black px-3 py-2 rounded-md text-base font-medium hover:underline"
          >
            About
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
