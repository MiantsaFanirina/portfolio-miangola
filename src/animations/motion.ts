import type { Variants } from 'framer-motion';

export const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const DUR = { fast: 0.35, med: 0.7, slow: 1.2 } as const;

// Clip reveal used for image frames (gallery rows, cards, media blocks).
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 1 },
  visible: {
    clipPath: 'inset(0 0 0 0)',
    transition: { duration: DUR.slow, ease: EASE_EDITORIAL },
  },
};

// Child image zoom that reacts to a parent's "hover" variant label.
export const imageZoom = (rest: number, hover: number): Variants => ({
  visible: { scale: rest, transition: { duration: DUR.fast, ease: EASE_EDITORIAL } },
  hover: { scale: hover, transition: { duration: DUR.slow, ease: EASE_EDITORIAL } },
});
