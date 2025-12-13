/**
 * Featured Products Section Content - Home Page
 * Modular content loader for multi-language support
 */
import type { Language } from "../../dictionary";

// Import all language versions
import en from "../../../../../content/home/featured-products/en.json";
import es from "../../../../../content/home/featured-products/es.json";
import fr from "../../../../../content/home/featured-products/fr.json";

export type FeaturedProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  colors?: string[];
  rating?: number;
};

export type FeaturedProductsContent = {
  title: string;
  subtitle: string;
  products: FeaturedProduct[];
};

// Alias for component usage
export type HomeFeaturedProductsContent = FeaturedProductsContent;

export const FEATURED_PRODUCTS_CONTENT: Record<
  Language,
  FeaturedProductsContent
> = {
  en: en as FeaturedProductsContent,
  es: es as FeaturedProductsContent,
  fr: fr as FeaturedProductsContent,
};
