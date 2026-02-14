
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-32 px-6 md:px-12 bg-black min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <header className="mb-20">
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter mb-4">CONTACT</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-16">
            <ContactItem 
              label="EMAIL" 
              value="contact@flips.com" 
              href="mailto:contact@flips.com" 
            />
            <ContactItem 
              label="INSTAGRAM" 
              value="@flips_official" 
              href="https://instagram.com/flips" 
            />
            <ContactItem 
              label="VIMEO" 
              value="vimeo.com/flips" 
              href="https://vimeo.com/flips" 
            />
            <ContactItem 
              label="PHONE" 
              value="010-XXXX-XXXX" 
              href="tel:01000000000" 
            />
          </div>
          
          <div className="flex flex-col justify-end">
            <p className="text-[10px] tracking-[0.5em] text-[#555555] uppercase leading-loose text-right">
              BASED IN SEOUL<br />
              GLOBAL INQUIRIES WELCOME<br />
              AVAILABLE FOR TRAVEL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactItem: React.FC<{ label: string; value: string; href: string }> = ({ label, value, href }) => (
  <div className="space-y-2">
    <p className="text-[10px] tracking-[0.3em] text-[#AAAAAA] uppercase font-medium">{label}</p>
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="text-2xl md:text-4xl font-light tracking-tight hover:text-[#AAAAAA] transition-all block"
    >
      {value}
    </a>
  </div>
);

export default Contact;
