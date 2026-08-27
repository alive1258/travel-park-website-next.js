"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ZoomInProps {
  children: ReactNode;
  className?: string;
}

const ZoomIn = ({ children, className = "" }: ZoomInProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default ZoomIn;
