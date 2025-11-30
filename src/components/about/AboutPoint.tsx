"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type ShapeType =
  | "square"
  | "triangle"
  | "circle"
  | "hexagon"
  | "diamond"
  | "pentagon";

interface AboutPointsProps {
  image: string;
  imageAlt: string;
  title: string;
  text: string;
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
  imageAlt,
  title,
  text,
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
          alt={imageAlt}
          className={`size-52 lg:size-80 max-w-[400px] max-h-[400px] aspect-square object-cover ${shapeStyles[shape]}`}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="flex flex-col gap-3 max-w-3xl text-center"
      >
        <h3 className="text-lg md:text-2xl font-semibold tracking-wide">{title}</h3>
        <p className="text-xl md:text-3xl tracking-wider leading-relaxed">{text}</p>
      </motion.div>
    </section>
  );
};
