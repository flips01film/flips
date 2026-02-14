
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (location.pathname === '/' || location.pathname === '') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  const navLinks = [
    { name: 'HOME', id: 'home' },
    { name: 'WORKS', id: 'work' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 md:px-12 flex justify-between items-center ${isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <Link to="/" onClick={(e) => handleNavClick(e as any, 'home')} className="brand-font text-xl md:text-2xl font-bold tracking-tighter">
        FLIPS
      </Link>
      
      <div className="flex gap-4 md:gap-10 items-center">
        {navLinks.map((link) => (
          link.path ? (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] md:text-xs font-medium tracking-[0.2em] hover:text-white transition-colors uppercase ${
                location.pathname === link.path ? 'text-white' : 'text-[#AAAAAA]'
              }`}
            >
              {link.name}
            </Link>
          ) : (
            <a
              key={link.id}
              href={`/#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id!)}
              className={`text-[10px] md:text-xs font-medium tracking-[0.2em] hover:text-white transition-colors text-[#AAAAAA] uppercase`}
            >
              {link.name}
            </a>
          )
        ))}
        <Link
          to="/admin"
          className={`text-[10px] md:text-xs font-medium tracking-[0.2em] hover:text-white transition-colors ${
            location.pathname === '/admin' ? 'text-white' : 'text-[#333]'
          } uppercase`}
        >
          ADMIN
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
