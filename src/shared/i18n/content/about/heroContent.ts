/**
 * Hero Section Content - About Page
 * Modular content loader for multi-language support
 */
import type { Language } from "../../dictionary";

// Import all language versions
import en from "../../../../../content/about/hero/en.json";
import es from "../../../../../content/about/hero/es.json";
import fr from "../../../../../content/about/hero/fr.json";

export type AboutHeroContent = {
  titleTop: string;
  titleBottom: string;
  image: string;
  imageAlt: string;
};

export const ABOUT_HERO_CONTENT: Record<Language, AboutHeroContent> = {
  en: en as AboutHeroContent,
  es: es as AboutHeroContent,
  fr: fr as AboutHeroContent,
};
