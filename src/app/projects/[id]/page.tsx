import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectById, getProjects } from '@/lib/projects';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="mb-8">
          <Link 
            href="/projects"
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>
        
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-6">
            {project.title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">
                Project Details
              </h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Year:</span> {project.year}</p>
                <p><span className="font-medium">Category:</span> {project.category}</p>
                <p><span className="font-medium">Role:</span> {project.role}</p>
                {project.director && (
                  <p><span className="font-medium">Director:</span> {project.director}</p>
                )}
                {project.productionCompany && (
                  <p><span className="font-medium">Production:</span> {project.productionCompany}</p>
                )}
                {project.network && (
                  <p><span className="font-medium">Network:</span> {project.network}</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="space-y-8">
        {project.images
          .sort((a, b) => a.order - b.order)
          .map((image) => (
            <div key={image.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 90vw"
                />
              </div>
              {image.caption && (
                <p className="mt-4 text-sm text-gray-600 text-center italic">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
      </div>

      {/* Credits */}
      {project.credits && project.credits.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="max-w-4xl">
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
              Credits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.credits.map((credit, index) => (
                <div key={index} className="flex">
                  <span className="font-medium text-gray-900 w-32">{credit.role}:</span>
                  <span className="text-gray-600">{credit.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-200">
        <div className="flex justify-between">
          <Link 
            href="/projects"
            className="inline-block border border-black text-black px-6 py-2 font-medium tracking-wide hover:bg-black hover:text-white transition-colors"
          >
            All Projects
          </Link>
          <Link 
            href="/contact"
            className="inline-block bg-black text-white px-6 py-2 font-medium tracking-wide hover:bg-gray-800 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}