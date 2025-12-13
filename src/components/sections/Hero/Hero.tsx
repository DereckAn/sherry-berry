"use client";

import type { HomeHeroContent } from "@/shared/i18n/content";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeroProps = {
  content: HomeHeroContent;
};

export function Hero({ content }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { title, subtitle, ctaLabel, images } = content;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Cambia cada 10 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Images con fade transition */}
      {images.map((image, index) => (
        <div
          key={image.url}
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
          {title}
        </h2>
        <div className=" flex flex-col lg:flex-row justify-between mt-6 gap-5 ">
          <p className="max-w-2xl font-antic tracking-wider text-md lg:text-xl">
            {subtitle}
          </p>
          <Link
            href="/menu"
            className="rounded-full py-3 px-5 w-fit bg-[#6A031E] hover:bg-[#91001A] transition-colors duration-300 text-sm h-fit"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
