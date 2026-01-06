/**
 * Footer Section Content
 * Modular content loader for multi-language support
 */
import type { Language } from "../../dictionary";

// Import all language versions
import en from "../../../../../content/footer/en.json";
import es from "../../../../../content/footer/es.json";
import fr from "../../../../../content/footer/fr.json";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterContent = {
  navigation: {
    title: string;
    links: FooterLink[];
  };
  help: {
    title: string;
    links: FooterLink[];
  };
  contact: {
    title: string;
  };
  social: {
    instagram: string;
    facebook: string;
  };
  copyright: string;
  legal: {
    privacy: string;
    terms: string;
    cookies: string;
  };
};

export const FOOTER_CONTENT: Record<Language, FooterContent> = {
  en: en as FooterContent,
  es: es as FooterContent,
  fr: fr as FooterContent,
};
