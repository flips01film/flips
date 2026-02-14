
import React, { useState } from 'react';
import { useProjectStore, useCategoryStore } from '../store';
import ProjectCard from '../components/ProjectCard';

const Work: React.FC = () => {
  const { projects } = useProjectStore();
  const { categories } = useCategoryStore();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const allCategories = ['ALL', ...categories];

  const filteredProjects = activeCategory === 'ALL'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">WORKS</h1>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {allCategories.map((cat) => (
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
          <div className="py-40 text-center">
            <p className="text-[#555555] text-xs tracking-widest uppercase">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Work;
