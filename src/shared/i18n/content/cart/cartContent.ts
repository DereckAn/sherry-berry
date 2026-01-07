/**
 * Cart Content
 * Modular content loader for multi-language support
 */
import type { Language } from "../../dictionary";

// Import all language versions
import en from "../../../../../content/cart/en.json";
import es from "../../../../../content/cart/es.json";
import fr from "../../../../../content/cart/fr.json";

export type CartContent = {
  title: string;
  closeButton: string;
  emptyCart: {
    title: string;
    subtitle: string;
  };
  actions: {
    decrease: string;
    increase: string;
    remove: string;
    clear: string;
  };
  checkout: {
    subtotal: string;
    taxNote: string;
    button: string;
  };
};

export const CART_CONTENT: Record<Language, CartContent> = {
  en: en as CartContent,
  es: es as CartContent,
  fr: fr as CartContent,
};
