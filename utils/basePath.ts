/**
 * Prepends the Next.js basePath to local image paths so they resolve
 * correctly when the site is served from a subdirectory (e.g. GitHub Pages).
 * External URLs (http/https) are returned unchanged.
 */
export function withBase(path: string): string {
  if (path.startsWith("http")) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
