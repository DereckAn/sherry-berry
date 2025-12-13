"use client";

import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { DetaislsCandles } from "@/components/sections/Details";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Hero } from "@/components/sections/Hero";
import { Ingredients } from "@/components/sections/Ingredients";
import { Projects } from "@/components/sections/Projects";
import { TrustBanner } from "@/components/sections/TrustBanner";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import {
  HOME_CTA,
  HOME_FEATURED_PRODUCTS,
  HOME_HERO,
  HOME_PROJECTS,
  HOME_TRUST_BANNER,
} from "@/shared/i18n/content";

export default function HomePage() {
  const { language } = useLanguage();

  return (
    <main>
      <Hero content={HOME_HERO[language]} />
      <DetaislsCandles />
      <TrustBanner content={HOME_TRUST_BANNER[language]} />
      <Ingredients />
      <FeaturedProducts content={HOME_FEATURED_PRODUCTS[language]} />
      <Projects content={HOME_PROJECTS[language]} />
      <CTASection content={HOME_CTA[language]} />
      <Footer />
    </main>
  );
}
