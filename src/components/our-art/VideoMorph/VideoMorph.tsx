"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type TextStep = {
  id: number;
  heading: string;
  description: string;
};

interface VideoMorphProps {
  videoId: string;
  title: string;
  textSteps: TextStep[];
}

const VideoMorph = ({ videoId, title, textSteps }: VideoMorphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate which text step should be visible based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Start showing text after circle is fully formed (after 0.5/50%)
      if (latest < 0.5) {
        setCurrentStepIndex(-1); // No text visible yet
      } else {
        // Divide remaining scroll (0.5 to 1.0) among text steps
        const textScrollRange = 1.0 - 0.5;
        const stepSize = textScrollRange / textSteps.length;
        const adjustedProgress = latest - 0.5;
        const newIndex = Math.min(
          Math.floor(adjustedProgress / stepSize),
          textSteps.length - 1
        );
        setCurrentStepIndex(newIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, textSteps.length]);

  const width = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6],
    ["100vw", "50vw", "50vw"]
  );
  const height = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6],
    ["100vh", "50vw", "50vw"]
  );

  const widthMobile = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6],
    ["100vw", "70vw", "70vw"]
  );
  const heightMobile = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6],
    ["100vh", "70vw", "70vw"]
  );

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    ["0%", "25%", "50%"]
  );

  const x = useTransform(
    scrollYProgress,
    [0.4, 0.7, 1],
    ["0%", "-35%", "-40%"]
  );

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.95, 0.85]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate height based on number of text steps
  // More height = more scroll space for smoother transitions
  const sectionHeight = `${300 + textSteps.length * 150}vh`;

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row items-center justify-center">
        <motion.div
          style={{
            borderRadius,
            scale,
            x: isMobile ? 0 : x,
          }}
          className="relative overflow-hidden flex items-center justify-center"
        >
          <motion.div
            style={{
              width: widthMobile,
              height: heightMobile,
            }}
            className="md:hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="w-full h-full video-morph-container">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                  title={title}
                  allow="autoplay"
                  allowFullScreen
                  className="w-full h-full absolute inset-0 border-0"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{
              width,
              height,
            }}
            className="hidden md:block"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="w-full h-full video-morph-container">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                  title={title}
                  allow="autoplay"
                  allowFullScreen
                  className="w-full h-full absolute inset-0 border-0"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Text Steps Container */}
        <div>
          {textSteps.map((step, index) => {
            const isVisible = currentStepIndex === index;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  x: isVisible ? 0 : 100,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute right-0 md:right-10 lg:right-24 max-w-md px-6 md:px-0 mt-6 md:mt-0 text-center md:text-left text-cream md:top-1/2 md:-translate-1/2"
                style={{
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                <motion.h2 className="font-legquinne text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
                  {step.heading}
                </motion.h2>
                <motion.p className="font-antic text-base md:text-xl leading-relaxed opacity-90">
                  {step.description}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VideoMorph;
