"use client";

import type { StoryPoint } from "@/shared/i18n/content";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AboutPoints, StraightLine } from ".";

type ShapeType =
  | "square"
  | "triangle"
  | "circle"
  | "hexagon"
  | "diamond"
  | "pentagon";

// Formas que oscilan: cuadrado, triángulo, círculo, hexágono, diamante, pentágono
const shapes: ShapeType[] = [
  "square",
  "triangle",
  "circle",
  "hexagon",
  "diamond",
  "pentagon",
];

type AboutListPointsProps = {
  points: StoryPoint[];
};

export const AboutListPoints = ({ points }: AboutListPointsProps) => {
  const LineWrapper = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
      <div ref={ref} className="relative py-20 flex justify-center">
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={
            isInView
              ? { height: "16rem", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-auto"
        >
          <StraightLine className="h-64" />
        </motion.div>
      </div>
    );
  };

  return (
    <>
      {points.map(({ image, text, title, imageAlt }, index) => {
        const shape = shapes[index % shapes.length];

        return (
          <div key={`point-${index}`}>
            {index > 0 && <LineWrapper />}
            <AboutPoints
              image={image}
              imageAlt={imageAlt}
              title={title}
              text={text}
              shape={shape}
            />
          </div>
        );
      })}
    </>
  );
};
