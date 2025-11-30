"use client";

import { AboutHero, AboutListPoints } from "@/components/about";
import { ABOUT_CONTENT } from "@/shared/i18n/aboutContent";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { useMemo } from "react";

const AboutPage = () => {
  const { language } = useLanguage();
  const copy = useMemo(() => ABOUT_CONTENT[language], [language]);

  return (
    <main className="bg-[#66CBEB] pb-72">
      <AboutHero
        titleTop={copy.heroTitleTop}
        titleBottom={copy.heroTitleBottom}
        image={copy.heroImage}
        imageAlt={copy.heroImageAlt}
        quote={copy.quote}
      />
      <AboutListPoints points={copy.points} />
    </main>
  );
};

export default AboutPage;
