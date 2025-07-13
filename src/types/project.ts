export interface Project {
  id: string;
  title: string;
  year: number;
  category: 'film' | 'television' | 'commercial' | 'theater';
  description: string;
  shortDescription: string;
  role: string;
  director?: string;
  productionCompany?: string;
  network?: string;
  images: ProjectImage[];
  videos?: ProjectVideo[];
  featured: boolean;
  status: 'completed' | 'in-production' | 'pre-production';
  credits?: Credit[];
}

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  thumbnail?: string;
  order: number;
}

export interface ProjectVideo {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  duration?: number;
  type: 'showreel' | 'behind-scenes' | 'final-cut';
}

export interface Credit {
  role: string;
  name: string;
}

export type ProjectCategory = Project['category'];
export type ProjectStatus = Project['status'];