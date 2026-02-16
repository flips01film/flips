
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'WORKS', path: '/work' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 py-8 px-6 md:px-12 flex justify-between items-center ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-5' : 'bg-transparent'}`}>
      <Link to="/" className="brand-font text-2xl md:text-3xl font-extrabold tracking-tighter">
        FLIPS
      </Link>
      
      <div className="flex gap-8 md:gap-12 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-[10px] md:text-[11px] font-bold tracking-[0.4em] transition-all uppercase ${
              location.pathname === link.path ? 'text-white' : 'text-[#555] hover:text-[#AAAAAA]'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
