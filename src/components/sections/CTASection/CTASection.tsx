import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { HomeCtaContent } from "@/shared/i18n/content";
import Image from "next/image";

type CTASectionProps = {
  content: HomeCtaContent;
};

export function CTASection({ content }: CTASectionProps) {
  const { title, paragraphs, bullets, buttonLabel, image, imageAlt } = content;

  return (
    <section className="py-24">
      <Container size="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-4/5">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-legquinne leading-tight">
              {title}
            </h2>
            <div className="space-y-4 text-lg text-charcoal leading-relaxed font-antic">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* Features list */}
            <ul className="space-y-3 py-4">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 font-rokkitt"
                >
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-charcoal">{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button variant="primary" className="rounded-full px-3 py-2">
                {buttonLabel}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
