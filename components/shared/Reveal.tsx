"use client";

import { motion } from "framer-motion";

/**
 * The site's single reveal motion. Everything that appears on scroll uses
 * this, so the whole page shares one unhurried rhythm: a soft fade with a
 * small upward drift, no bounce, no zoom, no slide-in from the side.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
