"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { HomeContent } from "@/shared/i18n/homeContent";

type ProjectsProps = {
  copy: Pick<
    HomeContent,
    "projectsTitle" | "projectsDescription" | "projectsCtaLabel" | "projectsItems"
  >;
};

export function Projects({ copy }: ProjectsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const raf = requestAnimationFrame(onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const { projectsTitle, projectsDescription, projectsCtaLabel, projectsItems } = copy;

  return (
    <section className="section bg-[#E5DDD5] py-16 lg:py-24">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
        {/* Left side - Text content */}
        <div className="lg:w-[800px] lg:min-w-[400px] px-6 lg:pl-12 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="font-legquinne text-6xl lg:text-9xl text-black">
              {projectsTitle}
            </h2>

            <p className="text-black/80 text-base lg:text-lg leading-relaxed ">
              {projectsDescription}
            </p>

            <Link
              href="/our-art"
              className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-black transition-colors duration-300"
            >
              {projectsCtaLabel}
            </Link>
          </div>

          {/* Navigation arrows - Desktop only */}
          <div className="hidden lg:flex gap-4 ">
            <button
              onClick={scrollPrev}
              className="w-14 h-14 rounded-full ring ring-black flex items-center justify-center hover:bg-black hover:text-white transition-color duration-300"
              aria-label="Previous project"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M20 12H4m0 0l6-6m-6 6l6 6"
                />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="w-14 h-14 rounded-full ring ring-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Next project"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M4 12h16m0 0l-6-6m6 6l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right side - Project carousel */}
        <div className="relative flex-1">
          {/* Counter - Desktop only */}
          <div className="hidden lg:block absolute top-6 right-16 z-10 text-black text-sm font-medium">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(projectsItems.length).padStart(2, "0")}
          </div>

          {/* Embla Carousel */}
          <div className="overflow-hidden pl-6 lg:pl-0" ref={emblaRef}>
            <div className="flex gap-4 lg:gap-6">
              {projectsItems.map((project) => (
                <div
                  key={project.id}
                  className="relative group cursor-pointer flex-[0_0_85%] md:flex-[0_0_calc(60%-12px)]"
                >
                  {/* Project image */}
                  <div className="relative aspect-4/5 overflow-hidden ">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 85vw, 50vw"
                    />
                  </div>

                  {/* Project title - Always visible at bottom */}
                  <p className="mt-4 text-black font-medium text-base tracking-wide">
                    {project.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows - Mobile only */}
          <div className="flex lg:hidden gap-4 justify-center mt-8 px-6">
            <button
              onClick={scrollPrev}
              className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Previous project"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Next project"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
