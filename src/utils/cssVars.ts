import type { CSSProperties } from 'react';

// Helper to set CSS custom properties in a `style` object without TS errors.
export const cssVars = (vars: Record<string, string | number>): CSSProperties =>
  vars as CSSProperties;
