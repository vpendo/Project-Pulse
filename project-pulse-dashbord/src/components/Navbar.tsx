import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const location = useLocation();
  const { isAuthenticated, user, signOut } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 py-3 sm:py-0 h-auto sm:h-16">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-gray-900">PROJECT PULSE </span>
            </Link>
            {/* Mobile menu toggle */}
            <button
              type="button"
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMobileOpen((prev) => !prev)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          <div
            className={`mt-3 sm:mt-0 flex flex-col sm:flex-row flex-wrap items-start sm:items-center sm:justify-end gap-3 sm:gap-8 ${
              isMobileOpen ? 'flex' : 'hidden sm:flex'
            }`}
          >
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 text-xs sm:text-sm font-medium transition-colors uppercase ${
                isActive('/')
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              Home
            </Link>
            <Link
              to="/features"
              className={`inline-flex items-center px-1 pt-1 text-xs sm:text-sm font-medium transition-colors uppercase ${
                isActive('/features')
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              Features
            </Link>
            <Link
              to="/dashboard"
              className={`inline-flex items-center px-1 pt-1 text-xs sm:text-sm font-medium transition-colors uppercase ${
                isActive('/dashboard')
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              Dashboard
            </Link>
            {isAuthenticated ? (
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm text-gray-700">
                  Welcome, <span className="font-medium">{user?.name}</span>
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors uppercase"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  to="/signin"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors uppercase"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

