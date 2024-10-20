import { Button } from 'antd';
import { useState, useEffect, useRef, useContext } from 'react';
import { auth } from '../utiles/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contaxt/AuthContaxt';
import { Link } from 'react-router-dom';

function Avatar({ src }) {
  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="flex items-center" ref={dropdownRef}>
      <div className="ml-3">
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100"
          id="user-menu-button"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={src || 'https://via.placeholder.com/150'} // Reliable fallback image URL
            alt="Profile"
            referrerPolicy="no-referrer" // Avoid referrer-related issues
          />
        </button>

        {isDropdownOpen && (
          <div
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
          >
            {/* Show these options for all users */}
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-200"
              role="menuitem"
            >
              Your Profile
            </a>

            {/* Show "Admin" link only for specific email */}
            {user && user.uid === "LSzRag8IhzgZXeUHJ1EsfoqD9gI3" && (
              <Link
                to="/addProduct"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-200"
                role="menuitem"
              >
                Admin
              </Link>
            )}

            {/* Sign out option for all users */}
            <Button
              onClick={handleSignOut}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-200"
            >
              Sign out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Avatar;
