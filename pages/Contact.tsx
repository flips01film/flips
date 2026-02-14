
import React from 'react';
import { useContactStore } from '../store';

const Contact: React.FC = () => {
  const { contact } = useContactStore();
  
  return (
    <div className="pt-40 pb-40 px-6 md:px-12 bg-black min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <header className="mb-32">
          <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter uppercase leading-none">CONTACT</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="space-y-20">
            <ContactItem 
              label="Email" 
              value={contact.email} 
              href={`mailto:${contact.email}`} 
            />
            <ContactItem 
              label="Instagram" 
              value={contact.instagram} 
              href={`https://instagram.com/${contact.instagram.replace('@', '')}`}
              highlight
            />
            <ContactItem 
              label="Vimeo" 
              value={contact.vimeo} 
              href={`https://${contact.vimeo}`} 
            />
            <ContactItem 
              label="Phone" 
              value={contact.phone} 
              href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`} 
            />
          </div>
          
          <div className="flex flex-col justify-end items-end text-right">
            <div className="space-y-4 opacity-30">
              <p className="text-[10px] tracking-[0.5em] uppercase font-bold">Based in Seoul</p>
              <p className="text-[10px] tracking-[0.5em] uppercase leading-loose">
                AUTHENTIC MOMENTS<br />
                ATMOSPHERE<br />
                EMOTIONAL ENERGY
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactItem: React.FC<{ label: string; value: string; href: string; highlight?: boolean }> = ({ label, value, href, highlight }) => (
  <div className="space-y-4 group">
    <p className="text-[10px] tracking-[0.4em] text-[#555] group-hover:text-[#AAAAAA] uppercase font-bold transition-colors">{label}</p>
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className={`text-3xl md:text-5xl font-light tracking-tighter block transition-all hover:translate-x-4 ${highlight ? 'text-white font-medium' : 'text-white/80'}`}
    >
      {value}
    </a>
  </div>
);

export default Contact;
