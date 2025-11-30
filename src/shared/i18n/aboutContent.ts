import type { Language } from "./dictionary";
import en from "../../../content/about/en.json";
import es from "../../../content/about/es.json";
import fr from "../../../content/about/fr.json";

export type AboutStoryPoint = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
};

export type AboutContent = {
  language: Language;
  heroTitleTop: string;
  heroTitleBottom: string;
  heroImage: string;
  heroImageAlt: string;
  quote: string;
  points: AboutStoryPoint[];
};

export const ABOUT_CONTENT: Record<Language, AboutContent> = {
  en: en as AboutContent,
  es: es as AboutContent,
  fr: fr as AboutContent,
};
