
import React from 'react';
import { Link } from 'react-router-dom';
import { useProjectStore, useHomeStore, useClientStore } from '../store';
import ProjectCard from '../components/ProjectCard';

const Home: React.FC = () => {
  const { projects } = useProjectStore();
  const { home } = useHomeStore();
  const { clientData } = useClientStore();
  
  const selectedWorks = projects.filter(p => p.isSelectedWork).slice(0, 6);

  return (
    <div className="w-full bg-black">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src={home.heroImage} 
            alt="Hero Background"
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
        </div>

        <div className="relative z-20 text-center space-y-12 px-6">
          <div className="space-y-4">
            <h1 className="brand-font text-6xl md:text-9xl font-extrabold tracking-tighter uppercase leading-none">{home.title}</h1>
            <p className="text-sm md:text-base tracking-[0.6em] text-white/80 uppercase font-light">{home.subtitle}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] md:text-xs tracking-[0.3em] text-[#AAAAAA] uppercase">
            {home.categories.map((cat, idx) => (
              <span key={idx}>{cat}</span>
            ))}
          </div>

          <p className="text-[10px] tracking-[0.4em] text-white/40 pt-16 uppercase">{home.location}</p>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30 animate-pulse">
            <span className="text-2xl font-light">↓</span>
          </div>
        </div>
      </section>

      {/* Selected Work Grid */}
      <section className="py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-baseline mb-20 border-b border-white/5 pb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase">Selected Work</h2>
            <Link to="/work" className="text-[10px] tracking-[0.2em] text-[#AAAAAA] hover:text-white transition-colors uppercase">All Projects</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {selectedWorks.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Worked With Section */}
      <section className="py-40 px-6 md:px-12 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] tracking-[0.5em] text-[#555] mb-24 uppercase font-bold text-center">Worked With</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div>
              <h3 className="text-[10px] tracking-[0.3em] text-[#AAAAAA] mb-16 uppercase font-bold border-l-2 border-white/20 pl-4">Artists</h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                {clientData.artists.map(artist => (
                  <p key={artist} className="text-lg md:text-xl font-light tracking-tight hover:text-[#AAAAAA] transition-colors cursor-default">{artist}</p>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-[10px] tracking-[0.3em] text-[#AAAAAA] mb-16 uppercase font-bold border-l-2 border-white/20 pl-4">Clients</h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                {clientData.clients.map(client => (
                  <p key={client} className="text-lg md:text-xl font-light tracking-tight hover:text-[#AAAAAA] transition-colors cursor-default">{client}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Link Section */}
      <section className="py-40 px-6 md:px-12 flex flex-col items-center text-center">
        <Link to="/contact" className="group">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 uppercase group-hover:opacity-60 transition-opacity">Contact</h2>
          <p className="text-[10px] tracking-[0.5em] text-[#555] uppercase">Email / Instagram</p>
        </Link>
      </section>
    </div>
  );
};

export default Home;
