"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { HomeContent } from "@/shared/i18n/homeContent";

type HeroProps = {
  copy: Pick<HomeContent, "heroTitle" | "heroSubtitle" | "heroCtaLabel">;
};

// Mock images - Replace with real images
const heroImages = [
  {
    id: 1,
    url: "/images/herocandel.webp",
    alt: "Velas artesanales ambiente 1",
  },
  {
    id: 2,
    url: "/images/herovela2.webp",
    alt: "Velas artesanales ambiente 2",
  },
  {
    id: 3,
    url: "/images/herovela3.webp",
    alt: "Velas artesanales ambiente 3",
  },
  {
    id: 4,
    url: "/images/herovela4.webp",
    alt: "Velas artesanales ambiente 4",
  },
  {
    id: 5,
    url: "/images/velas5.webp",
    alt: "Velas artesanales ambiente 5",
  },
];

export function Hero({ copy }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { heroTitle, heroSubtitle, heroCtaLabel } = copy;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 10000); // Cambia cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Images con fade transition */}
      {heroImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-3000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div className="relative h-full w-full">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="absolute bottom-0 h-72 lg:h-64 w-full md:px-28 text-white px-5">
        <h2 className="text-4xl md:text-6xl lg:text-8xl select-none font-legquinne pointer-events-none">
          {heroTitle}
        </h2>
        <div className=" flex flex-col lg:flex-row justify-between mt-6 gap-5 ">
          <p className="max-w-2xl font-antic tracking-wider text-md lg:text-xl">
            {heroSubtitle}
          </p>
          <Link
            href="/menu"
            className="rounded-full py-3 px-5 w-fit bg-[#6A031E] hover:bg-[#91001A] transition-colors duration-300 text-sm h-fit"
          >
            {heroCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
