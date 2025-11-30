"use client";

import { motion, useInView } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useRef } from "react";

type ShapeType =
  | "square"
  | "triangle"
  | "circle"
  | "hexagon"
  | "diamond"
  | "pentagon";

interface AboutPointsProps {
  image: string | StaticImageData;
  texto: string;
  shape?: ShapeType;
}

const shapeStyles: Record<ShapeType, string> = {
  square: "rounded-lg",
  triangle: "[clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]",
  circle: "rounded-full",
  hexagon:
    "[clip-path:polygon(25%_0%,_75%_0%,_100%_50%,_75%_100%,_25%_100%,_0%_50%)]",
  diamond: "[clip-path:polygon(50%_0%,_100%_50%,_50%_100%,_0%_50%)] rotate-0",
  pentagon: "[clip-path:polygon(50%_0%,_100%_38%,_82%_100%,_18%_100%,_0%_38%)]",
};

export const AboutPoints = ({
  image,
  texto,
  shape = "circle",
}: AboutPointsProps) => {
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
          className={`size-52 lg:size-80 max-w-[400px] max-h-[400px] aspect-square object-cover ${shapeStyles[shape]}`}
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
