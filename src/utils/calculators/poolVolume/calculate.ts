import { PoolDimensions, PoolVolumeResult } from './types';

const CUBIC_FEET_TO_GALLONS = 7.48052;
const GALLONS_TO_LITERS = 3.78541;

function convertToFeet(value: number, unit: 'feet' | 'meters'): number {
  return unit === 'meters' ? value * 3.28084 : value;
}

export function calculatePoolVolume(dimensions: PoolDimensions): PoolVolumeResult {
  // Convert all measurements to feet
  const length = convertToFeet(dimensions.length, dimensions.unit);
  const width = convertToFeet(dimensions.width, dimensions.unit);
  const depth = convertToFeet(dimensions.averageDepth, dimensions.unit);

  // Calculate volume in cubic feet
  let cubicFeet: number;
  switch (dimensions.shape) {
    case 'circular':
      cubicFeet = Math.PI * Math.pow(width / 2, 2) * depth;
      break;
    case 'oval':
      cubicFeet = Math.PI * (length / 2) * (width / 2) * depth;
      break;
    default: // rectangular
      cubicFeet = length * width * depth;
  }

  // Convert to other units
  const gallons = cubicFeet * CUBIC_FEET_TO_GALLONS;
  const liters = gallons * GALLONS_TO_LITERS;
  const cubicMeters = liters / 1000;

  // Calculate chemical needs (per 10,000 gallons)
  const chemicalFactor = gallons / 10000;
  const chemicals = {
    chlorine: Math.round(2.5 * chemicalFactor * 10) / 10, // lbs
    alkalinity: Math.round(25 * chemicalFactor * 10) / 10, // lbs
    stabilizer: Math.round(3 * chemicalFactor * 10) / 10, // lbs
    shock: Math.round(2 * chemicalFactor * 10) / 10 // lbs
  };

  // Calculate maintenance requirements
  const maintenance = {
    filterHours: Math.ceil(gallons / 2500), // Hours per day
    weeklyWaterLoss: Math.round(gallons * 0.02 * 10) / 10, // 2% weekly loss
    pumpSize: Math.ceil(gallons / 8 / 60) // GPM for 8-hour turnover
  };

  // Generate recommendations
  const recommendations = [
    {
      category: 'Filtration',
      suggestion: `Run filter ${maintenance.filterHours} hours daily for optimal circulation`
    },
    {
      category: 'Chemical Balance',
      suggestion: 'Test water chemistry 2-3 times per week'
    },
    {
      category: 'Water Level',
      suggestion: `Monitor for ${maintenance.weeklyWaterLoss} gallons weekly loss`
    },
    {
      category: 'Equipment',
      suggestion: `Use a ${maintenance.pumpSize} GPM pump for efficient turnover`
    }
  ];

  return {
    volume: {
      gallons: Math.round(gallons),
      liters: Math.round(liters),
      cubicFeet: Math.round(cubicFeet * 10) / 10,
      cubicMeters: Math.round(cubicMeters * 10) / 10
    },
    chemicals,
    maintenance,
    recommendations
  };
}