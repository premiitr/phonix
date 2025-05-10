import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-[#fffbea] shadow-lg border-b border-yellow-200 font-['Comic_Sans_MS','Comic_Neue','Poppins',sans-serif] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[70px]">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo192.png" alt="Phonix Logo"
                className="w-12 rounded-full border-2 border-pink-300 shadow-md p-1"/>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-transparent bg-clip-text">
                Phonix
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-lg font-semibold text-[#6b5b95]">
            <Link to="/" className="px-4 py-2 rounded-xl bg-pink-100 hover:bg-pink-200 transition duration-200">
              🏠 Home
            </Link>
            <Link to="/wordpuzzle" className="px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 transition duration-200">
              🧩 Word Puzzle
            </Link>
            <Link to="/pronounce" className="px-4 py-2 rounded-xl bg-teal-100 hover:bg-teal-200 transition duration-200">
              🎤 Pronounce
            </Link>
            <Link to="/phonetics" className="px-4 py-2 rounded-xl bg-yellow-100 hover:bg-yellow-200 transition duration-200">
              📚 Phonetics
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-4xl text-[#6b5b95] focus:outline-none">
              {mobileOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileOpen && (
          <div className="md:hidden mt-2 py-3 space-y-2 bg-[#fffbea] rounded-b-xl shadow-inner border-t border-yellow-300">
            <Link to="/" onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-lg text-[#6b5b95] rounded hover:bg-pink-100">
              🏠 Home
            </Link>
            <Link to="/wordpuzzle" onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-lg text-[#6b5b95] rounded hover:bg-purple-100">
              🧩 Word Puzzle
            </Link>
            <Link to="/pronounce" onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-lg text-[#6b5b95] rounded hover:bg-teal-100">
              🎤 Pronounce
            </Link>
            <Link to="/phonetics" onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-lg text-[#6b5b95] rounded hover:bg-yellow-100">
              📚 Phonetics
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
