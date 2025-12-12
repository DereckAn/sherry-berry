import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import type { HomeContent } from "@/shared/i18n/homeContent";

type CTASectionProps = {
  copy: Pick<
    HomeContent,
    "ctaTitle" | "ctaParagraphs" | "ctaBullets" | "ctaButtonLabel" | "ctaImageAlt"
  >;
};

export function CTASection({ copy }: CTASectionProps) {
  const { ctaTitle, ctaParagraphs, ctaBullets, ctaButtonLabel, ctaImageAlt } = copy;

  return (
    <section className="py-24">
      <Container size="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            {/* Placeholder - Replace with actual image */}
            <div className="relative aspect-4/5">
              <Image
                src="/images/vela11.webp"
                alt={ctaImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-legquinne leading-tight">
              {ctaTitle}
            </h2>
            <div className="space-y-4 text-lg text-charcoal leading-relaxed font-antic">
              {ctaParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* Features list */}
            <ul className="space-y-3 py-4">
              {ctaBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 font-rokkitt">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-charcoal">{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button variant="primary" className="rounded-full px-3 py-2">
                {ctaButtonLabel}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
