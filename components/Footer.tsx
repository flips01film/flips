
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-20 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6">
          <h2 className="brand-font text-2xl font-bold tracking-tighter">FLIPS</h2>
          <p className="text-[#555] text-[10px] leading-loose uppercase tracking-[0.3em]">
            Cinematography Company<br />Based in Seoul, Korea
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
          <div className="space-y-4">
            <h3 className="text-[9px] tracking-[0.4em] text-[#AAAAAA] font-bold uppercase">Navigate</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-[10px] tracking-widest hover:text-white text-[#555] transition-colors uppercase">Home</Link></li>
              <li><Link to="/work" className="text-[10px] tracking-widest hover:text-white text-[#555] transition-colors uppercase">Works</Link></li>
              <li><Link to="/about" className="text-[10px] tracking-widest hover:text-white text-[#555] transition-colors uppercase">About</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[9px] tracking-[0.4em] text-[#AAAAAA] font-bold uppercase">Social</h3>
            <ul className="space-y-2">
              <li><a href="https://instagram.com/flips_film" target="_blank" rel="noreferrer" className="text-[10px] tracking-widest hover:text-white text-[#555] transition-colors uppercase">Instagram</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[9px] tracking-[0.4em] text-[#AAAAAA] font-bold uppercase">Management</h3>
            <Link to="/admin" className="text-[10px] tracking-widest hover:text-white text-[#222] transition-colors uppercase font-bold">Admin</Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
        <p className="text-[9px] text-[#333] tracking-[0.3em] uppercase">© 2025 FLIPS CINEMATOGRAPHY. ALL RIGHTS RESERVED.</p>
        <p className="text-[9px] text-[#333] tracking-[0.3em] uppercase hidden md:block">CAPTURING THE ENERGY OF LIGHT AND SOUND.</p>
      </div>
    </footer>
  );
};

export default Footer;
