/**
 * Our Art Hero Content
 * Modular content loader for multi-language support
 */
import type { Language } from "../../dictionary";

// Import all language versions
import en from "../../../../../content/our-art/hero/en.json";
import es from "../../../../../content/our-art/hero/es.json";
import fr from "../../../../../content/our-art/hero/fr.json";

export type TextStep = {
  id: number;
  heading: string;
  description: string;
};

export type OurArtHeroContent = {
  videoId: string;
  title: string;
  textSteps: TextStep[];
  mainSection: {
    title: string;
    description: string;
  };
};

export const OUR_ART_HERO_CONTENT: Record<Language, OurArtHeroContent> = {
  en: en as OurArtHeroContent,
  es: es as OurArtHeroContent,
  fr: fr as OurArtHeroContent,
};
