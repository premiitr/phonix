import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-[#fffbea] shadow-md border-b border-yellow-300 font-['Comic_Sans_MS','Comic Neue','Poppins',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[70px]">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img src="/logo192.png" alt="Phonix Logo" className="w-[52px] rounded-full p-1 border-2 border-pink-300 shadow" />
            </Link>
            <span className="text-3xl sm:text-4xl font-extrabold tracking-wide bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-transparent bg-clip-text">
                Phonix
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-4 font-bold text-[#6b5b95]">
            <Link to="/" className="px-4 py-2 rounded-xl text-lg bg-pink-100 hover:bg-pink-200 transition">
              🏠 Home
            </Link>
            <Link to="/pronounce" className="px-4 py-2 rounded-xl text-lg bg-teal-100 hover:bg-teal-200 transition">
              🎤 Pronounce
            </Link>
            <Link to="/phonetics" className="px-4 py-2 rounded-xl text-lg bg-yellow-100 hover:bg-yellow-200 transition">
              📚 Phonetics
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-3xl text-[#6b5b95]">
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-yellow-300 py-3 space-y-2 bg-[#fffbea] shadow-inner rounded-b-md">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block px-4 py-2 rounded hover:bg-pink-100 text-[#6b5b95]">
              🏠 Home
            </Link>
            <Link to="/pronounce" onClick={() => setMobileOpen(false)} className="block px-4 py-2 rounded hover:bg-teal-100 text-[#6b5b95]">
              🎤 Pronounce
            </Link>
            <Link to="/phonetics" onClick={() => setMobileOpen(false)} className="block px-4 py-2 rounded hover:bg-yellow-100 text-[#6b5b95]">
              📚 Phonetics
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
