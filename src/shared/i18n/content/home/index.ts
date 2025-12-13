/**
 * Home Page Content - Barrel Export
 * Re-exports all home page section content modules
 */

export * from "./ctaContent";
export * from "./featuredProductsContent";
export * from "./heroContent";
export * from "./projectsContent";
export * from "./trustBannerContent";

// Convenient aliases for page-level imports
export { CTA_CONTENT as HOME_CTA } from "./ctaContent";
export { FEATURED_PRODUCTS_CONTENT as HOME_FEATURED_PRODUCTS } from "./featuredProductsContent";
export { HERO_CONTENT as HOME_HERO } from "./heroContent";
export { PROJECTS_CONTENT as HOME_PROJECTS } from "./projectsContent";
export { TRUST_BANNER_CONTENT as HOME_TRUST_BANNER } from "./trustBannerContent";
