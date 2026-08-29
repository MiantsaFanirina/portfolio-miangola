import meta from '../data/imageMeta.json';

type Mode = 'cover' | 'half' | 'full';

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const range: Record<Mode, [number, number]> = {
  cover: [0.72, 1.5],
  half: [0.66, 1.5],
  full: [0.8, 1.78],
};

// Returns a CSS aspect-ratio value (width / height) matching the image's real
// orientation, clamped so very tall/wide photos stay elegant in the layout.
export function aspectFor(src: string, mode: Mode = 'half'): number {
  const m = (meta as Record<string, { r: number } | null>)[src];
  if (!m || !m.r) return mode === 'full' ? 1.5 : 0.8;
  const [min, max] = range[mode];
  return Number(clamp(m.r, min, max).toFixed(3));
}

export type Orientation = 'landscape' | 'portrait' | 'square';

export function orientationOf(src: string): Orientation {
  const m = (meta as Record<string, { r: number; o: string } | null>)[src];
  if (!m) return 'portrait';
  if (m.o === 'landscape') return 'landscape';
  if (m.o === 'portrait') return 'portrait';
  return 'square';
}

// Raw width / height ratio (no clamping), used to render images at their real proportions.
export function ratioOf(src: string): number {
  const m = (meta as Record<string, { r: number } | null>)[src];
  return m?.r ?? 1;
}
