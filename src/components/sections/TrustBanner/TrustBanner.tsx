import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function TrustBanner() {
  return (
    <section className="py-24 sm:py-32 lg:py-40 ">
      <Container size="lg">
        <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-charcoal leading-tight px-4">
            Velas Artesanales de Lujo
            <br />
            <span className="italic font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 sm:mt-4 block">
              Confianza y Elegancia en Cada Aroma
            </span>
          </h2>

          {/* CTA Button */}
          <div className="pt-4 sm:pt-6">
            <Button
              variant="outline"
              size="lg"
              className="uppercase tracking-[0.2em] text-xs sm:text-sm px-8 sm:px-12 py-4 sm:py-5 rounded-full border-2 hover:bg-charcoal hover:text-white transition-all duration-300"
            >
              Descubre Sherry Berry
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
