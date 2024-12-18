export interface ConcreteResult {
  cubicYards: number;
  bags80lb: number;
  bags60lb: number;
  sand: number;
  gravel: number;
  estimatedCost: number;
}

export interface SlabDimensions {
  length: number;
  width: number;
  thickness: number;
}

export interface CircularDimensions {
  diameter: number;
  thickness: number;
}

export interface CylindricalDimensions {
  diameter: number;
  height: number;
  thickness: number;
}

const CUBIC_FEET_PER_YARD = 27;
const BAGS_PER_YARD_80LB = 7.2;  // 80lb bags per cubic yard
const BAGS_PER_YARD_60LB = 9.6;  // 60lb bags per cubic yard
const SAND_CUBIC_YARDS = 1.5;    // cubic yards of sand per cubic yard of concrete
const GRAVEL_CUBIC_YARDS = 2;    // cubic yards of gravel per cubic yard of concrete

export function calculateConcrete(
  dimensions: SlabDimensions | CircularDimensions | CylindricalDimensions,
  pricePerYard: number = 125,
  type: 'slab' | 'circular' | 'cylindrical' = 'slab'
): ConcreteResult {
  let cubicFeet: number;

  if (type === 'slab') {
    const { length, width, thickness } = dimensions as SlabDimensions;
    cubicFeet = (length * width * thickness) / 12; // Convert thickness from inches to feet
  } else if (type === 'circular') {
    const { diameter, thickness } = dimensions as CircularDimensions;
    const radius = diameter / 2;
    cubicFeet = (Math.PI * radius * radius * thickness) / 12;
  } else {
    const { diameter, height, thickness } = dimensions as CylindricalDimensions;
    const radius = diameter / 2;
    const outerVolume = Math.PI * radius * radius * height;
    const innerRadius = radius - thickness / 12;
    const innerVolume = Math.PI * innerRadius * innerRadius * height;
    cubicFeet = outerVolume - innerVolume;
  }

  const cubicYards = cubicFeet / CUBIC_FEET_PER_YARD;
  
  return {
    cubicYards: Math.round(cubicYards * 100) / 100,
    bags80lb: Math.ceil(cubicYards * BAGS_PER_YARD_80LB),
    bags60lb: Math.ceil(cubicYards * BAGS_PER_YARD_60LB),
    sand: Math.round(cubicYards * SAND_CUBIC_YARDS * 100) / 100,
    gravel: Math.round(cubicYards * GRAVEL_CUBIC_YARDS * 100) / 100,
    estimatedCost: Math.round(cubicYards * pricePerYard)
  };
}