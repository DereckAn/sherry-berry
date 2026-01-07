"use client";

import { VideoMorph } from "@/components/our-art";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { OUR_ART_HERO } from "@/shared/i18n/content";

const OurArtPage = () => {
  const { language } = useLanguage();
  const content = OUR_ART_HERO[language];

  return (
    <main className="bg-charcoal">
      {/* Hero Video Section with Scroll Morphing */}
      <VideoMorph
        videoId={content.videoId}
        title={content.title}
        textSteps={content.textSteps}
      />

      {/* Additional content section */}
      <section className="min-h-screen bg-cream py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-legquinne text-4xl md:text-5xl text-charcoal mb-8">
            {content.mainSection.title}
          </h2>
          <p className="font-antic text-lg text-charcoal/80 leading-relaxed">
            {content.mainSection.description}
          </p>
        </div>
      </section>
    </main>
  );
};

export default OurArtPage;
