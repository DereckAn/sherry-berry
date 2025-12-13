/**
 * About Page Content - Barrel Export
 * Re-exports all about page section content modules
 */

export * from "./heroContent";
export * from "./quoteContent";
export * from "./storyPointsContent";

// Convenient aliases for page-level imports
export { ABOUT_HERO_CONTENT as ABOUT_HERO } from "./heroContent";
export { QUOTE_CONTENT as ABOUT_QUOTE } from "./quoteContent";
export { STORY_POINTS_CONTENT as ABOUT_STORY_POINTS } from "./storyPointsContent";
