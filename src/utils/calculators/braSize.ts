export interface BraSizeResult {
  bandSize: number;
  cupSize: string;
  sisterSizes: {
    bandSize: number;
    cupSize: string;
  }[];
  fitTips: string[];
}

const cupSizes = ['AA', 'A', 'B', 'C', 'D', 'DD/E', 'DDD/F', 'G', 'H', 'I', 'J', 'K'];

export function calculateBraSize(
  underBust: number,
  bustMeasurement: number,
  measurementSystem: 'inches' | 'cm'
): BraSizeResult {
  // Convert cm to inches if needed
  if (measurementSystem === 'cm') {
    underBust = underBust / 2.54;
    bustMeasurement = bustMeasurement / 2.54;
  }

  // Calculate band size (round underbust to nearest even number)
  let bandSize = Math.round(underBust / 2) * 2;
  if (underBust < bandSize - 1) bandSize -= 2;
  
  // Calculate cup size
  const difference = Math.round(bustMeasurement - bandSize);
  const cupIndex = Math.max(0, difference - 1);
  const cupSize = cupSizes[Math.min(cupIndex, cupSizes.length - 1)];

  // Calculate sister sizes
  const sisterSizes = [];
  for (let i = -2; i <= 2; i++) {
    if (i !== 0) {
      const newBand = bandSize + (i * 2);
      if (newBand >= 28 && newBand <= 44) {
        const newCupIndex = cupIndex - i;
        if (newCupIndex >= 0 && newCupIndex < cupSizes.length) {
          sisterSizes.push({
            bandSize: newBand,
            cupSize: cupSizes[newCupIndex]
          });
        }
      }
    }
  }

  // Generate fit tips
  const fitTips = [
    'The band should be parallel to the ground and snug on the loosest hook',
    'The gore (center piece) should lay flat against your sternum',
    'Straps should be adjusted to stay in place without digging in',
    'Cups should fully contain breast tissue without gaps or overflow'
  ];

  return {
    bandSize,
    cupSize,
    sisterSizes,
    fitTips
  };
}