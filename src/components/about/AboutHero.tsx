"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type AboutHeroProps = {
  titleTop: string;
  titleBottom: string;
  image: string;
  imageAlt: string;
  quote: string;
};

export const AboutHero = ({
  titleTop,
  titleBottom,
  image,
  imageAlt,
  quote,
}: AboutHeroProps) => {
  return (
    <section className="min-h-screen flex flex-col font-legquinne justify-center items-center text-vainilla">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-9xl xl:text-[200px] font-bold text-center tracking-wider relative z-10 -mb-10 lg:mb-[-60px]"
      >
        {titleTop}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-20"
      >
        <Image
          src={image}
          alt={imageAlt}
          className="rounded-full aspect-square mx-auto object-cover 
                    size-[300px] sm:size-[350px] md:size-[400px] lg:size-[450px] xl:size-[500px]"
          width={500}
          height={500}
        />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="text-9xl xl:text-[200px] font-bold text-center tracking-wider relative z-10 mt-[-60px] lg:mt-[-90px]"
      >
        {titleBottom}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        className="mt-6 max-w-3xl text-center text-lg md:text-xl italic tracking-wide"
      >
        "{quote}"
      </motion.p>
    </section>
  );
};
