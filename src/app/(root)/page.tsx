import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TrustBanner } from "@/components/sections/TrustBanner";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBanner />
      {/* <About /> */}
      {/* <Craft /> */}
      <FeaturedProducts />
      <Projects />
      <CTASection />
      <Footer />
    </main>
  );
}
