export interface MulchResult {
  cubicYards: number;
  cubicFeet: number;
  bags: number;
  coverage: number;
  estimatedCost: {
    bulk: number;
    bagged: number;
  };
}

export interface MulchArea {
  length: number;
  width: number;
  depth: number;
  shape: 'rectangular' | 'circular';
}

const CUBIC_FEET_PER_YARD = 27;
const CUBIC_FEET_PER_BAG = 2; // Standard 2 cubic feet bag
const PRICE_PER_YARD = 35; // Average bulk price
const PRICE_PER_BAG = 5; // Average bag price

export function calculateMulch(areas: MulchArea[]): MulchResult {
  let totalCubicFeet = 0;

  // Calculate total cubic feet needed
  areas.forEach(area => {
    let squareFeet: number;
    
    if (area.shape === 'rectangular') {
      squareFeet = area.length * area.width;
    } else {
      // Circular area
      const radius = area.length / 2; // Length is diameter
      squareFeet = Math.PI * radius * radius;
    }

    // Convert depth from inches to feet
    const depthInFeet = area.depth / 12;
    totalCubicFeet += squareFeet * depthInFeet;
  });

  const cubicYards = totalCubicFeet / CUBIC_FEET_PER_YARD;
  const bags = Math.ceil(totalCubicFeet / CUBIC_FEET_PER_BAG);
  const coverage = totalCubicFeet * 12; // Coverage in square feet at 1 inch depth

  return {
    cubicYards: Math.round(cubicYards * 100) / 100,
    cubicFeet: Math.round(totalCubicFeet * 100) / 100,
    bags,
    coverage: Math.round(coverage),
    estimatedCost: {
      bulk: Math.round(cubicYards * PRICE_PER_YARD),
      bagged: Math.round(bags * PRICE_PER_BAG)
    }
  };
}