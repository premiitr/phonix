import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: '🏠 Home', bg: 'bg-pink-100 hover:bg-pink-200' },
    { to: '/wordpuzzle', label: '🧩 Word Puzzle', bg: 'bg-purple-100 hover:bg-purple-200' },
    { to: '/pronounce', label: '🎤 Pronounce', bg: 'bg-teal-100 hover:bg-teal-200' },
    { to: '/phonetics', label: '📚 Phonetics', bg: 'bg-yellow-100 hover:bg-yellow-200' },
    { to: '/stories', label: '📖 Stories', bg: 'bg-yellow-100 hover:bg-yellow-200' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-20 bg-[#fffbea] shadow-lg border-b border-yellow-200 font-['Comic_Sans_MS','Comic_Neue','Poppins',sans-serif] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[70px]">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo192.png" alt="Phonix Logo"
                className="w-12 rounded-full border-2 border-pink-300 shadow-md p-1"/>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-transparent bg-clip-text">
                Phonix
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-lg font-semibold text-[#6b5b95]">
            {navLinks.map(({ to, label, bg }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-xl ${bg} transition duration-200 ${isActive(to) ? 'ring-2 ring-pink-400' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              className="text-4xl text-[#6b5b95] focus:outline-none"
            >
              {mobileOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden mt-2 py-3 space-y-2 bg-[#fffbea] rounded-b-xl shadow-inner border-t border-yellow-300">
            {navLinks.map(({ to, label, bg }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2 text-lg text-[#6b5b95] rounded ${bg} ${isActive(to) ? 'ring-2 ring-pink-400' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
