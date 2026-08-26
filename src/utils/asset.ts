// Encode public asset paths (which contain spaces and accented characters)
// for safe use in `src` / CSS `url()`. Source images are pre-converted to
// WebP (see scripts/optimize-images.mjs), so the extension is rewritten.
export const asset = (path: string): string =>
  encodeURI(path.replace(/\.(jpe?g|png)$/i, '.webp'));

