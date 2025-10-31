"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

// Mock images - Replace with real images
const heroImages = [
  {
    id: 1,
    url: "/images/velas1.webp", // Placeholder
    alt: "Velas artesanales ambiente 1",
  },
  {
    id: 2,
    url: "/images/velas2.webp", // Placeholder
    alt: "Velas artesanales ambiente 2",
  },
  {
    id: 3,
    url: "/images/velas3.webp", // Placeholder
    alt: "Velas artesanales ambiente 3",
  },
  {
    id: 4,
    url: "/images/velas4.webp", // Placeholder
    alt: "Velas artesanales ambiente 4",
  },
  {
    id: 5,
    url: "/images/velas5.webp", // Placeholder
    alt: "Velas artesanales ambiente 5",
  },
];

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 40,
    },
    [Autoplay({ delay: 10000, stopOnInteraction: false })]
  );

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Embla Carousel */}
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {heroImages.map((image) => (
            <div
              key={image.id}
              className="embla__slide relative h-full min-w-full"
            >
              {/* Background Image - Replace with actual images */}
              <div className="relative h-full w-full ">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover "
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}
        </div>
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 flex flex-col justify-between w-full leading-20 lg:leading-44">
        <h2 className="text-[6.5rem] lg:text-[14.5vw] lg:text-nowrap font-serif font-bold text-white tracking-tighter text-center select-none pointer-events-none">
          SHERRY BERRY
        </h2>
      </div>
    </section>
  );
}
