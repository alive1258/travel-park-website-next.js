"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SlideDownProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const SlideDown = ({ children, className = "", delay = 1 }: SlideDownProps) => {
  const slideDownVariants = {
    offscreen: {
      y: -100,
      opacity: 0,
    },
    onscreen: {
      y: 0,
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
      variants={slideDownVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default SlideDown;
