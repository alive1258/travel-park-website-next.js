"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SlideUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const SlideUp = ({ children, className = "", delay = 1 }: SlideUpProps) => {
  const slideUpVariants = {
    offscreen: {
      y: 100,
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
      variants={slideUpVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default SlideUp;
