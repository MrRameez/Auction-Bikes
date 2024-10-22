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
    <div className=" inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r  p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 hover:scale-105 transition-transform duration-200"
        id="user-menu-button"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-full h-full rounded-full"
          src={src || 'https://via.placeholder.com/150'}
          alt="Profile"
          referrerPolicy="no-referrer"
        />
      </button>

      {isDropdownOpen && (
        <div
          className="right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <div className="py-1">
            {/* Profile link */}
            <Link
              to="/users/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-black transition-colors duration-150"
              role="menuitem"
            >
              Your Profile
            </Link>

            {/* Admin link for specific user */}
            {user && user.uid === "LSzRag8IhzgZXeUHJ1EsfoqD9gI3" && (
              <Link
                to="/addProduct"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-black transition-colors duration-150"
                role="menuitem"
              >
                Admin
              </Link>
            )}

            {/* Sign out option */}
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-black transition-colors duration-150"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Avatar;
