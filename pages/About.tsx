
import React from 'react';
import { useAboutStore, useClientStore } from '../store';

const About: React.FC = () => {
  const { about } = useAboutStore();
  const { clientData } = useClientStore();

  return (
    <div className="pt-40 pb-40 px-6 md:px-12 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 uppercase">FLIPS</h1>
          <p className="text-sm tracking-[0.5em] text-[#AAAAAA] uppercase font-light">Cinematography</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start mb-48">
          <div 
            className="aspect-[4/5] overflow-hidden bg-zinc-950 mx-auto lg:mx-0 shadow-2xl"
            style={{ width: `${about.profileImageSize || 100}%` }}
          >
            <img 
              src={about.profileImage} 
              alt="FLIPS Profile" 
              className="w-full h-full object-cover transition-all duration-700"
            />
          </div>
          
          <div className="space-y-12">
            <p className="text-2xl md:text-3xl font-light leading-snug tracking-tight text-white/90">
              {about.description1}
            </p>
            <p className="text-[#AAAAAA] text-sm md:text-base leading-relaxed tracking-wide font-light">
              {about.description2}
            </p>
            <div className="pt-12 space-y-6">
              <h3 className="text-[10px] tracking-[0.4em] text-white uppercase font-bold">Selected Clients</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                {clientData.clients.map(client => (
                  <p key={client} className="text-sm md:text-base tracking-tight text-white/60 uppercase">
                    {client}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
