
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface Props {
  project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <Link to={`/work/${project.id}`} className="group block overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      
      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-baseline">
          <p className="text-[9px] tracking-[0.4em] text-[#AAAAAA] uppercase font-bold">{project.artist}</p>
          <p className="text-[9px] tracking-[0.2em] text-[#444444] font-medium">{project.year}</p>
        </div>
        <h3 className="text-lg font-bold tracking-tighter uppercase leading-tight group-hover:translate-x-2 transition-transform duration-500">{project.title}</h3>
        <p className="text-[9px] tracking-[0.3em] text-[#555555] uppercase font-bold">{project.category}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
