/** Extract pixel dimensions from picsum-style URLs like .../800/1200 */
export function getImageDimensions(url: string): { width: number; height: number } {
  const match = url.match(/\/(\d+)\/(\d+)(?:[?#].*)?$/);
  if (match) return { width: Number(match[1]), height: Number(match[2]) };
  return { width: 1200, height: 800 };
}
