"use client";

import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TrustBanner } from "@/components/sections/TrustBanner";
import { HOME_CONTENT } from "@/shared/i18n/homeContent";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { useMemo } from "react";

export default function HomePage() {
  const { language } = useLanguage();
  const copy = useMemo(() => HOME_CONTENT[language], [language]);

  return (
    <main>
      <Hero copy={copy} />
      <TrustBanner copy={copy} />
      <FeaturedProducts copy={copy} />
      <Projects copy={copy} />
      <CTASection copy={copy} />
      <Footer />
    </main>
  );
}
