import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm fixed top-0 left-0 z-20">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg">
          <svg width="28" height="28" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="TeraPlayer logo">
            <circle cx="28" cy="28" r="28" fill="#2563eb"/>
            <polygon points="22,18 40,28 22,38" fill="#fff"/>
          </svg>
          TeraPlayer
        </Link>
        <div className="flex gap-4 text-sm items-center">
          <Link to="/" className={location.pathname === '/' ? "font-semibold text-blue-600 dark:text-blue-300" : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"}>Home</Link>
          <Link to="/about" className={location.pathname === '/about' ? "font-semibold text-blue-600 dark:text-blue-300" : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"}>About</Link>
          <Link to="/copyright-policy" className={location.pathname === '/copyright-policy' ? "font-semibold text-blue-600 dark:text-blue-300" : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"}>Copyright</Link>
          <Link to="/privacy-policy" className={location.pathname === '/privacy-policy' ? "font-semibold text-blue-600 dark:text-blue-300" : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"}>Privacy</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? "font-semibold text-blue-600 dark:text-blue-300" : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300"}>Contact</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
