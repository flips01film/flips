
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <footer className="bg-black py-20 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <h2 className="brand-font text-2xl font-bold mb-6">FLIPS</h2>
          <p className="text-[#AAAAAA] text-xs leading-relaxed uppercase tracking-wider">
            Cinematography Company<br />Based in Seoul, Korea
          </p>
        </div>
        
        <div>
          <h3 className="text-[10px] tracking-[0.2em] text-[#AAAAAA] mb-6 font-bold">EXPLORE</h3>
          <ul className="space-y-3">
            <li><a href="/#home" onClick={(e) => handleNavClick(e, 'home')} className="text-xs tracking-widest hover:text-white text-[#555] transition-colors uppercase">HOME</a></li>
            <li><a href="/#work" onClick={(e) => handleNavClick(e, 'work')} className="text-xs tracking-widest hover:text-white text-[#555] transition-colors uppercase">WORK</a></li>
            <li><a href="/#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-xs tracking-widest hover:text-white text-[#555] transition-colors uppercase">CONTACT</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] tracking-[0.2em] text-[#AAAAAA] mb-6 font-bold">SOCIAL</h3>
          <ul className="space-y-3">
            <li><a href="https://instagram.com/flips" target="_blank" className="text-xs tracking-widest hover:text-white text-[#555] transition-colors uppercase">INSTAGRAM</a></li>
            <li><a href="https://vimeo.com/flips" target="_blank" className="text-xs tracking-widest hover:text-white text-[#555] transition-colors uppercase">VIMEO</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] tracking-[0.2em] text-[#AAAAAA] mb-6 font-bold">ADMIN</h3>
          <Link to="/admin" className="text-xs tracking-widest hover:text-white text-[#333] transition-colors uppercase">MANAGEMENT</Link>
        </div>
      </div>
      
      <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
        <p className="text-[10px] text-[#333] tracking-widest uppercase">© 2025 FLIPS CINEMATOGRAPHY. ALL RIGHTS RESERVED.</p>
        <p className="text-[10px] text-[#333] tracking-widest uppercase">CAPTURING THE ENERGY OF LIGHT AND SOUND.</p>
      </div>
    </footer>
  );
};

export default Footer;
