
import React from 'react';
import { Link } from 'react-router-dom';
import { useProjectStore, useHomeStore, useClientStore } from '../store';
import ProjectCard from '../components/ProjectCard';

const Home: React.FC = () => {
  // Access data from stores instead of direct constant imports to fix the missing CLIENT_DATA error
  const { projects } = useProjectStore();
  const { home } = useHomeStore();
  const { clientData } = useClientStore();
  
  const selectedWorks = projects.filter(p => p.isSelectedWork).slice(0, 6);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Fullscreen Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            key={home.heroVideo}
          >
            <source src={home.heroVideo} type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 text-center space-y-8 px-6">
          <div className="space-y-2">
            <h1 className="brand-font text-5xl md:text-8xl font-bold tracking-tighter uppercase">{home.title}</h1>
            <p className="text-xs md:text-sm tracking-[0.5em] text-[#AAAAAA] uppercase">{home.subtitle}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] md:text-xs tracking-[0.2em] text-[#AAAAAA]">
            {home.categories.map((cat, idx) => (
              <span key={idx}>{cat}</span>
            ))}
          </div>

          <p className="text-[10px] tracking-[0.3em] text-white/50 pt-10 uppercase">{home.location}</p>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <span className="text-lg">↓</span>
          </div>
        </div>
      </section>

      {/* Selected Work Grid */}
      <section className="py-32 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-2xl font-bold tracking-tight">SELECTED WORKS</h2>
            <Link to="/work" className="text-[10px] tracking-[0.2em] text-[#AAAAAA] hover:text-white transition-colors">VIEW ALL</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {selectedWorks.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Worked With Section */}
      <section className="py-32 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h3 className="text-[10px] tracking-[0.3em] text-[#AAAAAA] mb-12 uppercase font-bold">ARTISTS</h3>
            <div className="grid grid-cols-2 gap-4">
              {clientData.artists.map(artist => (
                <p key={artist} className="text-sm md:text-lg tracking-tight hover:text-[#AAAAAA] transition-colors cursor-default">{artist}</p>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-[10px] tracking-[0.3em] text-[#AAAAAA] mb-12 uppercase font-bold">CLIENTS</h3>
            <div className="grid grid-cols-2 gap-4">
              {clientData.clients.map(client => (
                <p key={client} className="text-sm md:text-lg tracking-tight hover:text-[#AAAAAA] transition-colors cursor-default">{client}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-32 px-6 md:px-12 bg-black flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12 uppercase">LET'S CREATE</h2>
        <div className="flex flex-col md:flex-row gap-8 text-xs tracking-[0.2em] uppercase">
          <a href="mailto:contact@flips.com" className="hover:text-[#AAAAAA] transition-colors">CONTACT@FLIPS.COM</a>
          <a href="https://instagram.com/flips" className="hover:text-[#AAAAAA] transition-colors">@FLIPS_OFFICIAL</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
