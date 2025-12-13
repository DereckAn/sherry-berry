"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface VideoMorphProps {
  videoId: string;
  title?: string;
  sideText?: {
    heading: string;
    description: string;
  };
}

const VideoMorph = ({
  videoId,
  title = "Our Art Process",
  sideText = {
    heading: "Crafted with Passion",
    description:
      "Every piece we create tells a story. From raw ingredients to the finished product, our artisanal process ensures quality and authenticity in every detail.",
  },
}: VideoMorphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform values based on scroll progress
  // Phase 1 (0-0.5): Video morphs from fullscreen to circle
  // Phase 2 (0.5-1): Circle moves left, text appears

  // Video container dimensions
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

  // Border radius for the circle morph effect
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    ["0%", "25%", "50%"]
  );

  // Position for moving left
  const x = useTransform(
    scrollYProgress,
    [0.4, 0.7, 1],
    ["0%", "-20%", "-30%"]
  );

  // Text opacity and position
  const textOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.7, 0.85],
    [0, 0.5, 1]
  );
  const textX = useTransform(scrollYProgress, [0.5, 0.8], ["100px", "0px"]);

  // Scale for additional visual interest
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.95, 0.85]);

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      {/* Sticky container that stays in viewport during scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-charcoal">
        {/* Video container with morph animations */}
        <motion.div
          style={{
            width,
            height,
            borderRadius,
            x,
            scale,
          }}
          className="relative overflow-hidden flex items-center justify-center"
        >
          {/* Video wrapper - maintains aspect ratio */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-full video-morph-container">
              <LiteYouTubeEmbed
                id={videoId}
                title={title}
                poster="maxresdefault"
                webp
                noCookie
                params="autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1"
              />
            </div>
          </div>

          {/* Overlay gradient for depth */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, transparent 60%, rgba(45, 45, 45, 0.3) 100%)",
            }}
          />
        </motion.div>

        {/* Side text that appears as video morphs */}
        <motion.div
          style={{
            opacity: textOpacity,
            x: textX,
          }}
          className="absolute right-8 md:right-16 lg:right-24 max-w-md text-cream"
        >
          <motion.h2 className="font-legquinne text-4xl md:text-5xl lg:text-6xl mb-6">
            {sideText.heading}
          </motion.h2>
          <motion.p className="font-antic text-lg md:text-xl leading-relaxed opacity-90">
            {sideText.description}
          </motion.p>
        </motion.div>

        {/* Scroll indicator - visible at start */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/70"
        >
          <span className="text-sm font-josefin uppercase tracking-widest">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoMorph;
