/**
 * Quote Section Content - About Page
 * Modular content loader for multi-language support
 */
import type { Language } from "../../dictionary";

// Import all language versions
import en from "../../../../../content/about/quote/en.json";
import es from "../../../../../content/about/quote/es.json";
import fr from "../../../../../content/about/quote/fr.json";

export type QuoteContent = {
  quote: string;
};

export const QUOTE_CONTENT: Record<Language, QuoteContent> = {
  en: en as QuoteContent,
  es: es as QuoteContent,
  fr: fr as QuoteContent,
};
