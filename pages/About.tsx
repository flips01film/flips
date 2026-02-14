
import React from 'react';
import { CLIENT_DATA } from '../constants';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-32 px-6 md:px-12 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">FLIPS</h1>
          <p className="text-xs tracking-[0.4em] text-[#AAAAAA] uppercase">Cinematography</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-40">
          <div className="aspect-[4/5] overflow-hidden bg-zinc-900">
            <img 
              src="https://picsum.photos/id/101/1200/1500" 
              alt="FLIPS Profile" 
              className="w-full h-full object-cover grayscale opacity-80"
            />
          </div>
          
          <div className="space-y-10 py-10">
            <p className="text-xl md:text-2xl font-light leading-relaxed tracking-tight">
              FLIPS is a Seoul-based cinematography company specializing in concert, music video, broadcast, and commercial filming.
            </p>
            <p className="text-[#AAAAAA] text-sm md:text-base leading-relaxed tracking-wide">
              We focus on capturing authentic moments, atmosphere, and emotional energy in live and production environments. Our approach combines technical precision with a documentary-style emotional depth, ensuring that every project resonates with its intended audience.
            </p>
            <div className="pt-10 space-y-4">
              <h3 className="text-[10px] tracking-[0.3em] text-white uppercase">GEAR WE USE</h3>
              <p className="text-[11px] text-[#555555] tracking-widest leading-loose uppercase">
                SONY VENICE 2 / ARRI ALEXA MINI LF / SONY FX6 / SONY FX3 / ARRI SIGNATURE PRIMES / ZEISS SUPREME PRIMES / COOKE S4/i / DZOFILM VESPID PRIMES
              </p>
            </div>
          </div>
        </div>

        <section className="pt-20 border-t border-white/10">
          <h2 className="text-[10px] tracking-[0.3em] text-[#AAAAAA] mb-16 uppercase">SELECTED CLIENTS</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {CLIENT_DATA.clients.map(client => (
              <div key={client} className="text-sm md:text-lg tracking-tight uppercase hover:text-[#555555] transition-colors cursor-default">
                {client}
              </div>
            ))}
            <div className="text-sm md:text-lg tracking-tight uppercase hover:text-[#555555] transition-colors cursor-default">
              + MORE PRODUCTION COMPANIES
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
