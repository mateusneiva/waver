"use client";

import { motion } from "framer-motion";

const slides = [
  "Versatile bot",
  "Seamless experience",
  "Music Player",
  "Twitch Alerts",
  "Youtube Alerts",
  "Mod Commands",
];

export function Slider() {
  const duplicatedSlides = [...slides, ...slides];

  return (
    <div className="relative w-full overflow-hidden py-9 mx-auto bg-lime-400">
      <motion.div
        className="flex"
        animate={{
          x: ["0%", "-100%"],
          transition: {
            ease: "linear",
            duration: 15,
            repeat: Infinity,
          },
        }}
      >
        {duplicatedSlides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: `${100 / slides.length}%` }}
          >
            <div className="flex items-center justify-center h-full">
              <p className="font-extrabold text-xl text-black tracking-widest font-lexendDeca uppercase">
                {slide}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
