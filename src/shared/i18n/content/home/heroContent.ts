/**
 * Hero Section Content - Home Page
 * Modular content loader for multi-language support
 */
import type { Language } from "../../dictionary";

// Import all language versions
import en from "../../../../../content/home/hero/en.json";
import es from "../../../../../content/home/hero/es.json";
import fr from "../../../../../content/home/hero/fr.json";

export type HeroImage = {
  url: string;
  alt: string;
};

export type HeroContent = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  images: HeroImage[];
};

// Alias for component usage
export type HomeHeroContent = HeroContent;

export const HERO_CONTENT: Record<Language, HeroContent> = {
  en: en as HeroContent,
  es: es as HeroContent,
  fr: fr as HeroContent,
};
