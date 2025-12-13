/**
 * Trust Banner Section Content - Home Page
 * Modular content loader for multi-language support
 */
import type { Language } from "../../dictionary";

// Import all language versions
import en from "../../../../../content/home/trust-banner/en.json";
import es from "../../../../../content/home/trust-banner/es.json";
import fr from "../../../../../content/home/trust-banner/fr.json";

export type TrustBannerContent = {
  title: string;
  subtitle: string;
  ctaLabel: string;
};

// Alias for component usage
export type HomeTrustBannerContent = TrustBannerContent;

export const TRUST_BANNER_CONTENT: Record<Language, TrustBannerContent> = {
  en: en as TrustBannerContent,
  es: es as TrustBannerContent,
  fr: fr as TrustBannerContent,
};
