"use client";

import { motion } from "framer-motion";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  delay: number;
}

export function Section({ children, delay = 0, ...props }: SectionProps) {
  return (
    <section className="flex justify-center items-center w-full" {...props}>
      <motion.div
        className="flex justify-center gap-8 w-[1200px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
      >
        {children}
      </motion.div>
    </section>
  );
}
