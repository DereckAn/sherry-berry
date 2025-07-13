import { Project } from '@/types/project';

// TODO: This will be replaced with actual CMS/CDN integration
// For now, we'll use mock data for development

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'The Dark Knight',
    year: 2008,
    category: 'film',
    description: 'Production design for Christopher Nolan\'s acclaimed superhero film. Responsible for creating the iconic Gotham City aesthetic, including the design of Wayne Manor, the Batcave, and various Gotham locations.',
    shortDescription: 'Production design for Christopher Nolan\'s The Dark Knight',
    role: 'Production Designer',
    director: 'Christopher Nolan',
    productionCompany: 'Warner Bros. Pictures',
    images: [
      {
        id: '1-1',
        url: '/placeholder-project-1.jpg',
        alt: 'Gotham City street design',
        caption: 'Main street set design for Gotham City',
        width: 1920,
        height: 1080,
        thumbnail: '/placeholder-project-1-thumb.jpg',
        order: 1
      }
    ],
    featured: true,
    status: 'completed',
    credits: [
      { role: 'Director', name: 'Christopher Nolan' },
      { role: 'Producer', name: 'Emma Thomas' }
    ]
  },
  {
    id: '2',
    title: 'Stranger Things',
    year: 2023,
    category: 'television',
    description: 'Set design for the final season of the hit Netflix series. Created the Upside Down environments and various 1980s period-accurate locations.',
    shortDescription: 'Set design for Stranger Things Season 5',
    role: 'Set Designer',
    director: 'The Duffer Brothers',
    network: 'Netflix',
    images: [
      {
        id: '2-1',
        url: '/placeholder-project-2.jpg',
        alt: 'Upside Down set design',
        caption: 'The Upside Down laboratory set',
        width: 1920,
        height: 1080,
        thumbnail: '/placeholder-project-2-thumb.jpg',
        order: 1
      }
    ],
    featured: true,
    status: 'completed'
  }
];

// TODO: Replace with actual CMS API calls
export async function getProjects(): Promise<Project[]> {
  // This will eventually fetch from your CMS
  return mockProjects;
}

export async function getProjectById(id: string): Promise<Project | null> {
  // This will eventually fetch from your CMS
  const projects = await getProjects();
  return projects.find(project => project.id === id) || null;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(project => project.featured);
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(project => project.category === category);
}