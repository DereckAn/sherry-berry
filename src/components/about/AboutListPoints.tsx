"use client";

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

const listaHistoria = [
  {
    image: "/images/velas1.webp",
    texto: "Our began when ...",
  },
  {
    image: "/images/velas2.webp",
    texto: "Our story continues with...",
  },
  {
    image: "/images/velas3.webp",
    texto: "Our story continues with...",
  },
  {
    image: "/images/velas4.webp",
    texto: "Our story takes a new turn...",
  },
  {
    image: "/images/velas4.webp",
    texto: "Our story takes a new turn...",
  },
  {
    image: "/images/velas4.webp",
    texto: "Our story takes a new turn...",
  },
];

export const AboutListPoints = () => {
  return (
    <>
      {listaHistoria.map(({ image, texto }, index) => {
        const LineWrapper = () => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, amount: 0.3 });

          return (
            <div
              ref={ref}
              className="relative py-20 flex justify-center"
              key={`line-${index}`}
            >
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

        // Obtener la forma según el índice (oscila entre las formas disponibles)
        const shape = shapes[index % shapes.length];

        return (
          <div key={`point-${index}`} className="">
            {index > 0 && <LineWrapper />}
            <AboutPoints image={image} texto={texto} shape={shape} />
          </div>
        );
      })}
    </>
  );
};
