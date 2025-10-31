import { Hero } from '@/presentation/components/sections/Hero';
import { About } from '@/presentation/components/sections/About';
import { Craft } from '@/presentation/components/sections/Craft';
import { FeaturedProducts } from '@/presentation/components/sections/FeaturedProducts';
import { CTASection } from '@/presentation/components/sections/CTASection';
import { Footer } from '@/presentation/components/layout/Footer';

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
