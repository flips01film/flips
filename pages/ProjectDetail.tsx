
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectStore } from '../store';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects } = useProjectStore();
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <p className="text-[#AAAAAA] text-xs tracking-widest">PROJECT NOT FOUND</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pb-32">
      {/* Video Hero */}
      <section className="w-full aspect-video bg-zinc-900 video-container">
        <iframe 
          src={`${project.videoUrl}?autoplay=0&title=0&byline=0&portrait=0`} 
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture" 
          allowFullScreen
          title={project.title}
        ></iframe>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#AAAAAA] uppercase mb-2">{project.artist}</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
          </div>
          
          <div className="pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-3 gap-8">
             <InfoBlock label="CLIENT" value={project.client} />
             <InfoBlock label="PRODUCTION" value={project.production} />
             <InfoBlock label="CATEGORY" value={project.category} />
             <InfoBlock label="ROLE" value={project.role} />
             <InfoBlock label="COMPANY" value={project.company} />
             <InfoBlock label="YEAR" value={project.year} />
             <InfoBlock label="CAMERA" value={project.camera} />
             <InfoBlock label="LENS" value={project.lens} />
          </div>
        </div>

        <div className="flex flex-col justify-end">
           <button 
             onClick={() => navigate(-1)}
             className="text-[10px] tracking-[0.2em] text-[#AAAAAA] hover:text-white transition-colors border border-white/10 py-4 px-8 self-start lg:self-end"
           >
             BACK TO PROJECTS
           </button>
        </div>
      </section>
    </div>
  );
};

const InfoBlock: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-[9px] tracking-[0.2em] text-[#555555] uppercase font-semibold">{label}</p>
    <p className="text-[11px] md:text-xs tracking-wider text-[#FFFFFF]">{value}</p>
  </div>
);

export default ProjectDetail;
