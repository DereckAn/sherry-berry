import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Craft } from '@/components/sections/Craft';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Craft />
      <FeaturedProducts />
      <CTASection />
      <Footer />
    </main>
  );
}
