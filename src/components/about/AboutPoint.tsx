"use client";

import { motion, useInView } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useRef } from "react";

interface AboutPointsProps {
  image: string | StaticImageData;
  texto: string;
}

export const AboutPoints = ({ image, texto }: AboutPointsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="flex flex-col items-center justify-center gap-4 p-4 text-vainilla mt-[300px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full flex justify-center"
      >
        <Image
          width={500}
          height={500}
          src={image}
          alt={`texto imagen about ${texto}`}
          className="size-52 lg:size-80 max-w-[400px] max-h-[400px] aspect-square object-cover rounded-full"
        />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="text-xl md:text-4xl max-w-3xl text-center tracking-wider"
      >
        {texto}
      </motion.h3>
    </section>
  );
};
