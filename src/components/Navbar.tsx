import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = (
    <>
      <Link 
        to="/" 
        className={location.pathname === '/' 
          ? "font-semibold text-blue-600 dark:text-blue-300 block px-3 py-2 hover:bg-gray-100 md:block md:px-0 md:py-0 md:hover:bg-transparent" 
          : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 block px-3 py-2 hover:bg-gray-100 md:block md:px-0 md:py-0 md:hover:bg-transparent"
        } 
        onClick={() => setMenuOpen(false)}
      >
        Home
      </Link>
      <Link 
        to="/about" 
        className={location.pathname === '/about' 
          ? "font-semibold text-blue-600 dark:text-blue-300 block px-3 py-2 hover:bg-gray-100 md:block md:px-0 md:py-0 md:hover:bg-transparent" 
          : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 block px-3 py-2 hover:bg-gray-100 md:block md:px-0 md:py-0 md:hover:bg-transparent"
        } 
        onClick={() => setMenuOpen(false)}
      >
        About
      </Link>
      <Link 
        to="/copyright-policy" 
        className={location.pathname === '/copyright-policy' 
          ? "font-semibold text-blue-600 dark:text-blue-300 block px-3 py-2 hover:bg-gray-100 md:block md:px-0 md:py-0 md:hover:bg-transparent" 
          : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 block px-3 py-2 hover:bg-gray-100 md:block md:px-0 md:py-0 md:hover:bg-transparent"
        } 
        onClick={() => setMenuOpen(false)}
      >
        Copyright
      </Link>
      <Link 
        to="/privacy-policy" 
        className={location.pathname === '/privacy-policy' 
          ? "font-semibold text-blue-600 dark:text-blue-300 block px-3 py-2 hover:bg-gray-100 md:block md:px-0 md:py-0 md:hover:bg-transparent" 
          : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 block px-3 py-2 hover:bg-gray-100 md:block md:px-0 md:py-0 md:hover:bg-transparent"
        } 
        onClick={() => setMenuOpen(false)}
      >
        Privacy
      </Link>
      <Link 
        to="/contact" 
        className={location.pathname === '/contact' 
          ? "font-semibold text-blue-600 dark:text-blue-300 block px-3 py-2 hover:bg-gray-100 md:block md:px-0 md:py-0 md:hover:bg-transparent" 
          : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 block px-3 py-2 hover:bg-gray-100 md:block md:px-0 md:py-0 md:hover:bg-transparent"
        } 
        onClick={() => setMenuOpen(false)}
      >
        Contact
      </Link>
    </>
  );

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm fixed top-0 left-0 z-20">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2 relative">
        <Link to="/" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg">
          <svg width="28" height="28" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="TeraDownloaderPlayer logo">
            <circle cx="28" cy="28" r="28" fill="#2563eb"/>
            <polygon points="22,18 40,28 22,38" fill="#fff"/>
          </svg>
          TeraDownloaderPlayer
        </Link>
        
        {/* Desktop nav links */}
        <div className="flex-1 justify-center hidden md:flex">
          <div className="flex gap-4 text-sm items-center">
            {navLinks}
          </div>
        </div>
        
        {/* Right side: Language, Theme, and Mobile Menu */}
        <div className="flex items-center gap-2">
          <select
            className="px-2 py-1 rounded text-xs border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring"
            value={localStorage.getItem('language') || 'en'}
            onChange={e => {
              localStorage.setItem('language', e.target.value);
              // Trigger a custom event to notify other components
              window.dispatchEvent(new CustomEvent('languageChange', { detail: e.target.value }));
            }}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="de">Deutsch</option>
            <option value="id">Bahasa Indonesia</option>
            <option value="pt">Português</option>
            <option value="es">Español</option>
            <option value="uk">українська</option>
            <option value="fr">Français</option>
            <option value="it">Italiano</option>
            <option value="th">ภาษาไทย</option>
            <option value="bn">বাংলা</option>
            <option value="cs">Čeština</option>
            <option value="ko">한국어</option>
            <option value="ms">Bahasa Melayu</option>
            <option value="vi">Tiếng Việt</option>
            <option value="te">తెలుగు</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="ml">മലയാളം</option>
          </select>
          <ThemeToggle />
          
          {/* Hamburger for mobile */}
          <div className="md:hidden relative">
            <button
              className="p-2 rounded focus:outline-none focus:ring bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              aria-label="Open navigation menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
              )}
            </button>
            {/* Dropdown menu */}
            {menuOpen && (
              <div className="absolute top-full right-0 w-48 bg-white shadow-lg rounded mt-2 py-2 z-30 border border-gray-200 animate-fade-in">
                {navLinks}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
