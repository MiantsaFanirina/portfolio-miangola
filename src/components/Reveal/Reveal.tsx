import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { cssVars } from '../../utils/cssVars';

type Variant = 'up' | 'fade' | 'clip' | 'blur';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
}

export function Reveal({
  children,
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  threshold,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, {
    once: true,
    amount: typeof threshold === 'number' ? threshold : 'some',
  });
  const variantClass = variant === 'up' ? '' : `reveal--${variant}`;
  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${inView ? 'is-inview' : ''} ${className}`.trim()}
      style={{ ...style, ...cssVars({ '--reveal-delay': `${delay}s` }) }}
    >
      {children}
    </Tag>
  );
}
