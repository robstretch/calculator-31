import { ConeInput, ConeResult } from './types';

const PI = Math.PI;

function convertToMeters(value: number, unit: string): number {
  switch (unit) {
    case 'inches': return value * 0.0254;
    case 'feet': return value * 0.3048;
    default: return value;
  }
}

function convertFromMeters(value: number, toUnit: string): number {
  switch (toUnit) {
    case 'inches': return value / 0.0254;
    case 'feet': return value / 0.3048;
    default: return value;
  }
}

export function calculateCone(input: ConeInput): ConeResult {
  // Convert inputs to meters for calculations
  const radius = convertToMeters(input.radius, input.unit);
  const height = convertToMeters(input.height, input.unit);
  
  // Calculate slant height using Pythagorean theorem
  const slantHeight = Math.sqrt(Math.pow(height, 2) + Math.pow(radius, 2));
  
  // Calculate volume
  const volume = (1/3) * PI * Math.pow(radius, 2) * height;
  
  // Calculate surface areas
  const baseArea = PI * Math.pow(radius, 2);
  const lateralArea = PI * radius * slantHeight;
  const totalArea = baseArea + lateralArea;
  
  // Calculate sector angle for pattern
  const sectorAngle = (360 * radius) / slantHeight;
  
  const calculations = [
    {
      step: 'Slant Height',
      formula: 'L = √(h² + r²)',
      result: slantHeight
    },
    {
      step: 'Volume',
      formula: 'V = (1/3)πr²h',
      result: volume
    },
    {
      step: 'Lateral Surface Area',
      formula: 'A = πrs',
      result: lateralArea
    }
  ];

  const recommendations = [
    {
      category: 'Construction',
      suggestion: sectorAngle > 360 ?
        'Consider segmenting into multiple pieces' :
        'Single piece construction possible'
    },
    {
      category: 'Material',
      suggestion: totalArea > 10 ?
        'Use reinforced material for stability' :
        'Standard material sufficient'
    },
    {
      category: 'Assembly',
      suggestion: 'Start from base and work upwards'
    },
    {
      category: 'Measurement',
      suggestion: 'Double-check radius and height measurements'
    }
  ];

  return {
    volume: {
      cubicMeters: volume,
      cubicFeet: volume * 35.3147,
      cubicInches: volume * 61023.7,
      liters: volume * 1000
    },
    surfaceArea: {
      lateral: lateralArea,
      base: baseArea,
      total: totalArea
    },
    dimensions: {
      slantHeight,
      baseCircumference: 2 * PI * radius,
      sectorAngle
    },
    calculations,
    recommendations
  };
}