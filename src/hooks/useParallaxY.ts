import { useLayoutEffect, useRef } from 'react';
import { useReducedMotion, useScroll, useTransform } from 'framer-motion';

export function useParallaxY<T extends HTMLElement = HTMLDivElement>(speed = 0.15) {
  const ref = useRef<T | null>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, () => {
    if (reduce) return 0;
    const el = ref.current;
    if (!el) return 0;
    const vh = window.innerHeight || 0;
    const rect = el.getBoundingClientRect();
    const centre = rect.top + rect.height / 2 - vh / 2;
    return -centre * speed;
  });

  // Recompute once layout has settled so the first paint gets the correct
  // offset (avoids a wrong initial transform after SPA navigation).
  useLayoutEffect(() => {
    const v = window.scrollY;
    scrollY.set(v + 0.01);
    scrollY.set(v);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, y };
}
