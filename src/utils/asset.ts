// Encode public asset paths (which contain spaces and accented characters)
// for safe use in `src` / CSS `url()`.
export const asset = (path: string): string => encodeURI(path);
