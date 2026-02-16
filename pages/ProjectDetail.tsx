
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
        <p className="text-[#555] text-[10px] tracking-[0.4em] uppercase">Project Not Found</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pb-40">
      {/* Video Hero */}
      <section className="w-full aspect-video bg-zinc-950 video-container">
        <iframe 
          src={`${project.videoUrl}?autoplay=0&title=0&byline=0&portrait=0`} 
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture" 
          allowFullScreen
          title={project.title}
          className="w-full h-full"
        ></iframe>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-8 space-y-8 md:space-y-12">
          <div className="space-y-4">
            <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-[#AAAAAA] uppercase font-bold">{project.artist}</p>
            <h1 className="text-3xl md:text-6xl font-bold tracking-tighter uppercase leading-tight">{project.title}</h1>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 md:gap-y-16 pt-12 md:pt-16 border-t border-white/5">
             <InfoBlock label="Client" value={project.client} />
             <InfoBlock label="Category" value={project.category} />
             <InfoBlock label="Role" value={project.role} />
             <InfoBlock label="Camera" value={project.camera} />
             <InfoBlock label="Year" value={project.year} />
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-start lg:items-end">
           <button 
             onClick={() => navigate(-1)}
             className="w-full lg:w-auto text-[10px] tracking-[0.3em] text-[#555] hover:text-white transition-all border border-white/10 px-10 py-5 uppercase font-bold hover:bg-white hover:text-black"
           >
             Back to Work
           </button>
        </div>
      </section>
    </div>
  );
};

const InfoBlock: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="space-y-2 md:space-y-3">
    <p className="text-[8px] md:text-[9px] tracking-[0.3em] text-[#444] uppercase font-extrabold">{label}</p>
    <p className="text-[11px] md:text-sm tracking-widest text-[#FFFFFF] font-light leading-snug">{value || '-'}</p>
  </div>
);

export default ProjectDetail;
