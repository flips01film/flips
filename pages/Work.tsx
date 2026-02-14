
import React, { useState } from 'react';
import { useProjectStore, useCategoryStore } from '../store';
import ProjectCard from '../components/ProjectCard';

const Work: React.FC = () => {
  const { projects } = useProjectStore();
  const { categories } = useCategoryStore();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  // Dynamic filter options based on Admin-defined categories
  const filterOptions = ['ALL', ...categories];

  const filteredProjects = activeCategory === 'ALL'
    ? projects
    : projects.filter(p => p.category.toUpperCase() === activeCategory.toUpperCase());

  return (
    <div className="pt-40 pb-40 px-6 md:px-12 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-16 uppercase">WORK</h1>
          
          <div className="flex flex-wrap gap-x-10 gap-y-6">
            {filterOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${
                  activeCategory === cat ? 'text-white border-b border-white pb-2' : 'text-[#555555] hover:text-[#AAAAAA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-60 text-center border border-dashed border-white/5">
            <p className="text-[#555555] text-[10px] tracking-[0.3em] uppercase font-bold">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Work;
