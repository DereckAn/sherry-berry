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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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
    ["0%", "-20%", "-30%"]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.7, 0.85],
    [0, 0.5, 1]
  );
  const textX = useTransform(scrollYProgress, [0.5, 0.8], ["100px", "0px"]);

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.95, 0.85]);

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row items-center justify-center">
        <motion.div
          style={{
            borderRadius,
            scale,
            x
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
          </motion.div>
        </motion.div>

        <motion.div
          style={{
            opacity: textOpacity,
            x: textX,
          }}
          className="relative md:absolute right-0 md:right-16 lg:right-24 max-w-md px-6 md:px-0 mt-6 md:mt-0 text-center md:text-left text-cream"
        >
          <motion.h2 className="font-legquinne text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
            {sideText.heading}
          </motion.h2>
          <motion.p className="font-antic text-base md:text-xl leading-relaxed opacity-90">
            {sideText.description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoMorph;
