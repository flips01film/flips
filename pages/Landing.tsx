
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProjectStore, useContactStore } from '../store';
import ProjectCard from '../components/ProjectCard';
import { Category } from '../types';
import { CLIENT_DATA } from '../constants';

const Landing: React.FC = () => {
  const { projects } = useProjectStore();
  const { contact } = useContactStore();
  const { hash } = useLocation();
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const categories = Object.values(Category);
  const filteredProjects = activeCategory === Category.ALL
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="w-full bg-black text-white">
      {/* HOME SECTION */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-recording-a-concert-with-a-camera-34563-large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-20 text-center space-y-8 px-6">
          <div className="space-y-2">
            <h1 className="brand-font text-5xl md:text-8xl font-bold tracking-tighter">FLIPS</h1>
            <p className="text-xs md:text-sm tracking-[0.5em] text-[#AAAAAA] uppercase">Cinematography</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] md:text-xs tracking-[0.2em] text-[#AAAAAA]">
            <span>CONCERT</span>
            <span>MUSIC VIDEO</span>
            <span>BROADCAST</span>
            <span>COMMERCIAL</span>
          </div>
          <p className="text-[10px] tracking-[0.3em] text-white/50 pt-10 uppercase">Based in Seoul</p>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <span className="text-lg">↓</span>
          </div>
        </div>
      </section>

      {/* WORK SECTION */}
      <section id="work" className="py-32 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <header className="mb-20">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">WORK</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${
                    activeCategory === cat ? 'text-white underline underline-offset-8' : 'text-[#555555] hover:text-[#AAAAAA]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </header>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-40 text-center border border-dashed border-white/5">
              <p className="text-[#555555] text-xs tracking-widest uppercase">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* WORKED WITH (Moved from About) */}
      <section className="py-32 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h3 className="text-[10px] tracking-[0.3em] text-[#AAAAAA] mb-12 uppercase font-bold">ARTISTS</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {CLIENT_DATA.artists.map(artist => (
                  <p key={artist} className="text-sm tracking-tight text-[#666]">{artist}</p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] tracking-[0.3em] text-[#AAAAAA] mb-12 uppercase font-bold">CLIENTS</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {CLIENT_DATA.clients.map(client => (
                  <div key={client} className="text-sm tracking-tight text-[#666]">
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-black border-t border-white/5 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <header className="mb-20">
            <h2 className="text-5xl md:text-9xl font-bold tracking-tighter mb-4">CONTACT</h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-16">
              <ContactItem label="EMAIL" value={contact.email} href={`mailto:${contact.email}`} />
              <ContactItem label="INSTAGRAM" value={contact.instagram} href={`https://instagram.com/${contact.instagram.replace('@', '')}`} />
              <ContactItem label="VIMEO" value={contact.vimeo} href={`https://${contact.vimeo}`} />
              <ContactItem label="PHONE" value={contact.phone} href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`} />
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
      </section>
    </div>
  );
};

const ContactItem: React.FC<{ label: string; value: string; href: string }> = ({ label, value, href }) => (
  <div className="space-y-2">
    <p className="text-[10px] tracking-[0.3em] text-[#AAAAAA] uppercase font-bold">{label}</p>
    <a href={href} target="_blank" rel="noreferrer" className="text-2xl md:text-4xl font-light tracking-tight hover:text-[#AAAAAA] transition-all block">
      {value}
    </a>
  </div>
);

export default Landing;
