import { RoofPitchInput, RoofPitchResult } from './types';

const SHINGLE_COVERAGE = 33.3; // Square feet per bundle
const SHINGLE_COST = 35; // Cost per bundle
const UNDERLAYMENT_COVERAGE = 200; // Square feet per roll
const UNDERLAYMENT_COST = 25; // Cost per roll
const NAILS_PER_SQUARE = 320; // Nails needed per 100 sq ft
const NAILS_COST = 5; // Cost per pound (approximately 250 nails)

function convertToFeet(value: number, unit: 'inches' | 'feet' | 'meters'): number {
  switch (unit) {
    case 'inches':
      return value / 12;
    case 'meters':
      return value * 3.28084;
    default:
      return value;
  }
}

export function calculateRoofPitch(input: RoofPitchInput): RoofPitchResult {
  // Convert all measurements to feet
  const run = convertToFeet(input.run, input.unit);
  const rise = convertToFeet(input.rise, input.unit);
  const width = convertToFeet(input.roofWidth, input.unit);
  const length = convertToFeet(input.roofLength, input.unit);

  // Calculate basic measurements
  const angle = Math.atan(rise / run) * (180 / Math.PI);
  const slope = rise / run;
  const ratio = `${input.rise}:${input.run}`;

  // Calculate actual rafter length using Pythagorean theorem
  const actualLength = Math.sqrt(rise * rise + run * run);
  
  // Calculate surface area
  const surfaceArea = width * actualLength;
  
  // Calculate materials needed
  const shingleBundles = Math.ceil(surfaceArea / SHINGLE_COVERAGE);
  const underlaymentRolls = Math.ceil(surfaceArea / UNDERLAYMENT_COVERAGE);
  const nailsNeeded = Math.ceil((surfaceArea / 100) * NAILS_PER_SQUARE);
  
  // Calculate total cost
  const totalCost = (shingleBundles * SHINGLE_COST) +
                   (underlaymentRolls * UNDERLAYMENT_COST) +
                   (Math.ceil(nailsNeeded / 250) * NAILS_COST);

  const specifications = [
    {
      metric: 'Pitch Angle',
      value: angle,
      description: 'Angle of roof slope in degrees'
    },
    {
      metric: 'Pitch Ratio',
      value: slope,
      description: 'Rise over run ratio'
    },
    {
      metric: 'Rafter Length',
      value: actualLength,
      description: 'Actual length of roof surface'
    }
  ];

  const recommendations = [
    {
      category: 'Pitch Suitability',
      suggestion: angle < 14 ? 
        'Consider steeper pitch for better drainage' :
        angle > 45 ?
        'Very steep pitch - ensure proper safety measures' :
        'Good pitch for standard roofing applications'
    },
    {
      category: 'Material Selection',
      suggestion: angle < 18 ?
        'Use special low-slope roofing materials' :
        'Standard shingles suitable for this pitch'
    },
    {
      category: 'Installation',
      suggestion: angle > 30 ?
        'Use roof jacks and safety equipment' :
        'Standard safety precautions adequate'
    },
    {
      category: 'Ventilation',
      suggestion: 'Install ridge vents and soffit vents for proper airflow'
    }
  ];

  return {
    angle: Math.round(angle * 10) / 10,
    ratio,
    slope: Math.round(slope * 100) / 100,
    measurements: {
      actualLength: Math.round(actualLength * 100) / 100,
      surfaceArea: Math.round(surfaceArea * 100) / 100,
      verticalRise: Math.round(rise * 100) / 100
    },
    materials: {
      shingles: shingleBundles,
      underlayment: underlaymentRolls,
      nails: nailsNeeded,
      estimatedCost: Math.round(totalCost)
    },
    recommendations,
    specifications
  };
}