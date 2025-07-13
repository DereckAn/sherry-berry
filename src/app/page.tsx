import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import { getFeaturedProjects } from '@/lib/projects';

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-black mb-6">
            Film & Television
            <br />
            <span className="font-medium">Set Designer</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            Creating immersive environments that bring stories to life through 
            thoughtful design and meticulous attention to detail.
          </p>
          <div className="mt-12">
            <Link 
              href="/projects"
              className="inline-block bg-black text-white px-8 py-3 text-lg font-medium tracking-wide hover:bg-gray-800 transition-colors"
            >
              View Work
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A selection of recent work spanning film, television, and commercial productions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/projects"
              className="inline-block border border-black text-black px-8 py-3 text-lg font-medium tracking-wide hover:bg-black hover:text-white transition-colors"
            >
              All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
