/**
 * Projects Section Content - Home Page
 * Modular content loader for multi-language support
 */
import type { Language } from "../../dictionary";

// Import all language versions
import en from "../../../../../content/home/projects/en.json";
import es from "../../../../../content/home/projects/es.json";
import fr from "../../../../../content/home/projects/fr.json";

export type ProjectItem = {
  id: number;
  title: string;
  image: string;
  alt: string;
};

export type ProjectsContent = {
  title: string;
  description: string;
  ctaLabel: string;
  items: ProjectItem[];
};

// Alias for component usage
export type HomeProjectsContent = ProjectsContent;

export const PROJECTS_CONTENT: Record<Language, ProjectsContent> = {
  en: en as ProjectsContent,
  es: es as ProjectsContent,
  fr: fr as ProjectsContent,
};
