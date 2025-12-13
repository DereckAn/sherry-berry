/**
 * CTA Section Content - Home Page
 * Modular content loader for multi-language support
 */
import type { Language } from "../../dictionary";

// Import all language versions
import en from "../../../../../content/home/cta/en.json";
import es from "../../../../../content/home/cta/es.json";
import fr from "../../../../../content/home/cta/fr.json";

export type CTAContent = {
  title: string;
  paragraphs: string[];
  bullets: string[];
  buttonLabel: string;
  image: string;
  imageAlt: string;
};

// Alias for component usage
export type HomeCtaContent = CTAContent;

export const CTA_CONTENT: Record<Language, CTAContent> = {
  en: en as CTAContent,
  es: es as CTAContent,
  fr: fr as CTAContent,
};
