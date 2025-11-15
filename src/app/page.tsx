import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Craft } from "@/components/sections/Craft";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Craft />
      <FeaturedProducts />
      <Projects />
      <CTASection />
      <Footer />
    </main>
  );
}
