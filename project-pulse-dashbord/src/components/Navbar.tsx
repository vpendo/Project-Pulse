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
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 py-4 sm:py-0 h-auto sm:h-16">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                PROJECT PULSE
              </span>
            </Link>
            {/* Mobile menu toggle */}
            <button
              type="button"
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-colors"
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
            className={`mt-3 sm:mt-0 flex flex-col sm:flex-row flex-wrap items-start sm:items-center sm:justify-end gap-4 sm:gap-8 ${
              isMobileOpen ? 'flex' : 'hidden sm:flex'
            }`}
          >
            <Link
              to="/"
              className={`inline-flex items-center px-3 py-2 text-sm font-semibold transition-all uppercase tracking-wide rounded-lg ${
                isActive('/')
                  ? 'text-orange-500 bg-orange-50 border-b-2 border-orange-500'
                  : 'text-gray-700 hover:text-orange-500 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/features"
              className={`inline-flex items-center px-3 py-2 text-sm font-semibold transition-all uppercase tracking-wide rounded-lg ${
                isActive('/features')
                  ? 'text-orange-500 bg-orange-50 border-b-2 border-orange-500'
                  : 'text-gray-700 hover:text-orange-500 hover:bg-gray-50'
              }`}
            >
              Features
            </Link>
            <Link
              to="/dashboard"
              className={`inline-flex items-center px-3 py-2 text-sm font-semibold transition-all uppercase tracking-wide rounded-lg ${
                isActive('/dashboard')
                  ? 'text-orange-500 bg-orange-50 border-b-2 border-orange-500'
                  : 'text-gray-700 hover:text-orange-500 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </Link>
            {isAuthenticated ? (
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-0 border-t border-gray-200 sm:border-t-0">
                <span className="text-xs sm:text-sm text-gray-700">
                  Welcome, <span className="font-semibold text-gray-900">{user?.name}</span>
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-orange-500 hover:bg-gray-50 transition-all rounded-lg uppercase tracking-wide"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-4 pt-2 sm:pt-0 border-t border-gray-200 sm:border-t-0">
                <Link
                  to="/signin"
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-orange-500 hover:bg-gray-50 transition-all rounded-lg uppercase tracking-wide"
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

