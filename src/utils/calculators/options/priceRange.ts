export function generatePriceRange(currentPrice: number, points: number = 41): number[] {
  return Array.from(
    { length: points },
    (_, i) => currentPrice * (0.8 + (i * 0.01))
  );
}