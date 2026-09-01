import React from 'react';
import { motion } from 'motion/react';

interface HeadingRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
  once?: boolean;
}

export const HeadingReveal: React.FC<HeadingRevealProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 30,
  duration = 0.85,
  once = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default HeadingReveal;
