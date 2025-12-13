/**
 * Story Points Section Content - About Page
 * Modular content loader for multi-language support
 */
import type { Language } from "../../dictionary";

// Import all language versions
import en from "../../../../../content/about/story-points/en.json";
import es from "../../../../../content/about/story-points/es.json";
import fr from "../../../../../content/about/story-points/fr.json";

export type StoryPoint = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
};

export type StoryPointsContent = {
  points: StoryPoint[];
};

export const STORY_POINTS_CONTENT: Record<Language, StoryPointsContent> = {
  en: en as StoryPointsContent,
  es: es as StoryPointsContent,
  fr: fr as StoryPointsContent,
};
