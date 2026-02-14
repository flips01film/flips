
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface Props {
  project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <Link to={`/work/${project.id}`} className="group block overflow-hidden">
      <div className="relative aspect-video overflow-hidden bg-[#111]">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
      </div>
      
      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <p className="text-[10px] tracking-[0.2em] text-[#AAAAAA] uppercase">{project.artist}</p>
          <p className="text-[10px] tracking-[0.2em] text-[#555555]">{project.year}</p>
        </div>
        <h3 className="text-sm font-medium tracking-tight group-hover:translate-x-1 transition-transform duration-300">{project.title}</h3>
        <p className="text-[9px] tracking-widest text-[#666666] uppercase">{project.category}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
