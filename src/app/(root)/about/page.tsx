"use client";

import { AboutHero, AboutListPoints } from "@/components/about";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import {
  ABOUT_HERO,
  ABOUT_QUOTE,
  ABOUT_STORY_POINTS,
} from "@/shared/i18n/content";

const AboutPage = () => {
  const { language } = useLanguage();
  const hero = ABOUT_HERO[language];
  const quote = ABOUT_QUOTE[language];
  const storyPoints = ABOUT_STORY_POINTS[language];

  return (
    <main className="bg-[#66CBEB30] pb-72">
      <AboutHero
        titleTop={hero.titleTop}
        titleBottom={hero.titleBottom}
        image={hero.image}
        imageAlt={hero.imageAlt}
        quote={quote.quote}
      />
      <AboutListPoints points={storyPoints.points} />
    </main>
  );
};

export default AboutPage;
