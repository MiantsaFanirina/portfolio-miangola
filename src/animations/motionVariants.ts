export const easing = {
  editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
  smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
  expressive: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

export const duration = {
  fast: 0.35,
  med: 0.7,
  slow: 1.2,
};

// Stagger steps (seconds) for grouped reveals.
export const stagger = (count: number, base = 0.05, step = 0.1): string[] =>
  Array.from({ length: count }, (_, i) => `${base + i * step}s`);
