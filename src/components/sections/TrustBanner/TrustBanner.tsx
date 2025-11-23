import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { HomeContent } from "@/shared/i18n/homeContent";

type TrustBannerProps = {
  copy: Pick<HomeContent, "trustTitle" | "trustSubtitle" | "trustCtaLabel">;
};

export function TrustBanner({ copy }: TrustBannerProps) {
  const { trustTitle, trustSubtitle, trustCtaLabel } = copy;

  return (
    <section className="py-24 sm:py-32 lg:py-40 ">
      <Container size="lg">
        <div className="mx-auto text-center space-y-8 sm:space-y-12">
          {/* Main Heading */}
          <h2 className="text-5xl sm:text-5xl md:text-5xl lg:text-8xl font-legquinne md:text-nowrap text-black leading-tight px-4">
            {trustTitle}
            <br />
            <span className="italic font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 sm:mt-4 block">
              {trustSubtitle}
            </span>
          </h2>

          {/* CTA Button */}
          <div className="pt-4 sm:pt-6">
            <Button
              variant="outline"
              size="lg"
              className="uppercase tracking-[0.2em] text-xs sm:text-sm px-8 sm:px-12 py-4 sm:py-5 rounded-full border-2 hover:bg-black transition-all duration-300"
            >
              {trustCtaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
