"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import velas1 from "../../../public/images/velas1.webp";

export const AboutHero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-vainilla">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-9xl xl:text-[200px] font-bold text-center tracking-wider relative z-10 mb-[-40px] md:mb-[-40px] lg:mb-[-60px]"
      >
        Our
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-20"
      >
        <Image
          src={velas1}
          alt=""
          className="rounded-full aspect-square mx-auto object-cover 
                    size-[300px] sm:size-[350px] md:size-[400px] lg:size-[450px] xl:size-[500px]"
        />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="text-9xl xl:text-[200px] font-bold text-center tracking-wider relative z-10 mt-[-60px] lg:mt-[-90px]"
      >
        Story
      </motion.h2>
    </section>
  );
};