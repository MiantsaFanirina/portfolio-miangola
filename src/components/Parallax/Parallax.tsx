import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useParallaxY } from '../../hooks/useParallaxY';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

export function Parallax({ children, speed = 0.12, className = '', style }: ParallaxProps) {
  const { ref, y } = useParallaxY<HTMLDivElement>(speed);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}
