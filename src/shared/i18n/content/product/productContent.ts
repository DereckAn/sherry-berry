/**
 * Product Content
 * Modular content loader for multi-language support
 */
import type { Language } from "../../dictionary";

// Import all language versions
import en from "../../../../../content/product/en.json";
import es from "../../../../../content/product/es.json";
import fr from "../../../../../content/product/fr.json";

export type ProductContent = {
  dialog: {
    close: string;
    quantity: string;
    decrease: string;
    increase: string;
    subtotal: string;
    addToCart: string;
    features: string[];
  };
  card: {
    viewDetails: string;
    addToCart: string;
    imagePlaceholder: string;
  };
};

export const PRODUCT_CONTENT: Record<Language, ProductContent> = {
  en: en as ProductContent,
  es: es as ProductContent,
  fr: fr as ProductContent,
};
