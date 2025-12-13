import { VideoMorph } from "@/components/our-art";

const OurArtPage = () => {
  return (
    <main className="bg-charcoal">
      {/* Hero Video Section with Scroll Morphing */}
      <VideoMorph
        videoId="mqVflITAM_U"
        title="Sherry Berry - Our Art Process"
        sideText={{
          heading: "Crafted with Passion",
          description:
            "Every piece we create tells a story. From raw ingredients to the finished product, our artisanal process ensures quality and authenticity in every detail.",
        }}
      />

      {/* Additional content sections can be added here */}
      <section className="min-h-screen bg-cream py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-legquinne text-4xl md:text-5xl text-charcoal mb-8">
            The Art of Creation
          </h2>
          <p className="font-antic text-lg text-charcoal/80 leading-relaxed">
            Our process begins with carefully selected ingredients, hand-picked
            for their quality and character. Each step is a labor of love,
            combining traditional techniques with modern innovation.
          </p>
        </div>
      </section>
    </main>
  );
};

export default OurArtPage;
