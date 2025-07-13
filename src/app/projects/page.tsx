'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { getProjects } from '@/lib/projects';
import { Project, ProjectCategory } from '@/types/project';

const categories: { label: string; value: ProjectCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Film', value: 'film' },
  { label: 'Television', value: 'television' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Theater', value: 'theater' },
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Load projects on mount
  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-6">
            All Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive collection of film, television, and commercial set design work.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 bg-gray-50 p-2 rounded-lg">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2 text-sm font-medium tracking-wide transition-colors rounded-md ${
                  selectedCategory === category.value
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-black hover:bg-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}