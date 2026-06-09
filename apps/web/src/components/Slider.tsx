"use client";

import { motion } from "framer-motion";

const slides = [
  "Versatile bot",
  "Music Player",
  "Twitch Alerts",
  "Youtube Alerts",
  "Mod Commands",
];

const ITEM_WIDTH = 260; 
const SETS = 6; 
const ONE_SET_WIDTH = ITEM_WIDTH * slides.length;

export function Slider() {
  const repeatedSlides = Array.from({ length: SETS }, () => slides).flat();

  return (
    <div className="relative w-full overflow-hidden py-9 bg-lime-400">
      <motion.div
        className="flex"
        style={{ width: ONE_SET_WIDTH * SETS }}
        animate={{
          x: [0, -ONE_SET_WIDTH],
        }}
        transition={{
          ease: "linear",
          duration: 14,
          repeat: Infinity,
        }}
      >
        {repeatedSlides.map((slide, index) => (
          <div
            key={index}
            className="flex shrink-0 items-center justify-center"
            style={{ width: ITEM_WIDTH }}
          >
            <p className="font-extrabold text-xl text-black tracking-widest font-lexendDeca uppercase whitespace-nowrap">
              {slide}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
