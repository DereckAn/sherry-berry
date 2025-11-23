import type { Language } from "./dictionary";
import en from "../../../content/home/en.json";
import es from "../../../content/home/es.json";
import fr from "../../../content/home/fr.json";

export type HomeContent = {
  language: Language;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  featuredTitle: string;
  featuredSubtitle: string;
  featuredProducts: {
    id: string;
    name: string;
    price: number;
    image: string;
    colors?: string[];
    rating?: number;
  }[];
  projectsTitle: string;
  projectsDescription: string;
  projectsCtaLabel: string;
  projectsItems: {
    id: number;
    title: string;
    image: string;
    alt: string;
  }[];
  ctaTitle: string;
  ctaParagraphs: string[];
  ctaBullets: string[];
  ctaButtonLabel: string;
  ctaImageAlt: string;
  trustTitle: string;
  trustSubtitle: string;
  trustCtaLabel: string;
};

export const HOME_CONTENT: Record<Language, HomeContent> = {
  en,
  es,
  fr,
};
