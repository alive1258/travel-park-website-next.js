"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SlideLeftProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const SlideLeft = ({ children, className = "", delay = 1 }: SlideLeftProps) => {
  const slideLeftVariants = {
    offscreen: {
      x: -100,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: delay === 1 ? 0 : 0.3 * delay,
      },
    },
  };
  return (
    <motion.div
      className={className}
      variants={slideLeftVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default SlideLeft;
