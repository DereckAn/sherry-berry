import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const mainImage = project.images[0];

  return (
    <Link 
      href={`/projects/${project.id}`}
      className={`group block ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {mainImage && (
          <Image
            src={mainImage.url}
            alt={mainImage.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* Project info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-medium text-lg mb-1">{project.title}</h3>
          <p className="text-white/80 text-sm">{project.year} • {project.category}</p>
        </div>
      </div>
      
      {/* Project title below image - always visible */}
      <div className="pt-3">
        <h3 className="font-medium text-black text-lg tracking-tight">{project.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{project.year} • {project.role}</p>
      </div>
    </Link>
  );
}