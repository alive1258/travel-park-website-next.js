"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageFadeInProps {
  children: ReactNode;
  className?: string;
}

/** One-time fade/slide-up on initial mount — for page-load entrances,
 * not scroll-triggered like the other Animaation components. */
const PageFadeIn = ({ children, className = "" }: PageFadeInProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageFadeIn;
