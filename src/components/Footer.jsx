import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#fffbea] text-center py-4 mt-auto border-t border-yellow-200 shadow-inner font-['Comic_Sans_MS','Comic Neue','Poppins',sans-serif]">
      <p className="text-[#6b5b95] text-sm sm:text-base">
        © {new Date().getFullYear()} <span className="font-bold text-[#ff6b81]">Phonix</span> — Helping Kids Speak with Confidence! 🎉
      </p>
    </footer>
  );
};

export default Footer;
