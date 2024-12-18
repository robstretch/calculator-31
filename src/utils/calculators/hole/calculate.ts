import { HoleInput, HoleResult } from './types';

const SOIL_DIFFICULTY = {
  loose: { factor: 1, time: 1 },
  average: { factor: 1.3, time: 1.5 },
  dense: { factor: 1.6, time: 2 },
  rocky: { factor: 2, time: 3 }
};

const PURPOSE_REQUIREMENTS = {
  post: { gravel: 0.1, concrete: 0.15 },
  planting: { gravel: 0.05, soil: 1 },
  foundation: { gravel: 0.2, concrete: 0.8 },
  utility: { gravel: 0.15, sand: 0.2 }
};

function convertToFeet(value: number, unit: string): number {
  switch (unit) {
    case 'inches':
      return value / 12;
    case 'meters':
      return value * 3.28084;
    default:
      return value;
  }
}

export function calculateHole(input: HoleInput): HoleResult {
  // Convert dimensions to feet
  const diameter = convertToFeet(input.diameter, input.unit);
  const depth = convertToFeet(input.depth, input.unit);

  // Calculate volume
  const radius = diameter / 2;
  const cubicFeet = Math.PI * radius * radius * depth;
  const cubicYards = cubicFeet / 27;
  const gallons = cubicFeet * 7.48052;

  // Calculate excavation details
  const difficulty = SOIL_DIFFICULTY[input.soilType];
  const timeEstimate = (cubicYards * difficulty.time) / 2; // hours

  // Calculate materials needed
  const requirements = PURPOSE_REQUIREMENTS[input.purpose];
  const materials = {
    backfill: cubicYards * (requirements.soil || 0),
    gravel: cubicYards * requirements.gravel,
    concrete: requirements.concrete ? cubicYards * requirements.concrete : undefined
  };

  // Calculate costs
  const laborCost = timeEstimate * 75; // $75/hour
  const materialsCost = (
    (materials.backfill * 30) + // $30/yard for soil
    (materials.gravel * 45) +   // $45/yard for gravel
    ((materials.concrete || 0) * 150) // $150/yard for concrete
  );
  const equipmentCost = timeEstimate * 50; // $50/hour for equipment

  // Generate recommendations
  const recommendations = [
    {
      category: 'Safety',
      suggestion: depth > 5 ?
        'Call 811 before digging and ensure proper shoring' :
        'Call 811 before digging to locate utilities'
    },
    {
      category: 'Method',
      suggestion: diameter > 2 ?
        'Use power auger or mini excavator' :
        'Hand digging or manual post hole digger suitable'
    },
    {
      category: 'Soil Conditions',
      suggestion: input.soilType === 'rocky' ?
        'Consider hydro excavation for difficult soil' :
        'Standard excavation methods appropriate'
    },
    {
      category: 'Weather',
      suggestion: 'Check weather forecast and avoid digging in rain'
    }
  ];

  return {
    volume: {
      cubicFeet: Math.round(cubicFeet * 100) / 100,
      cubicYards: Math.round(cubicYards * 100) / 100,
      gallons: Math.round(gallons)
    },
    excavation: {
      timeEstimate: Math.round(timeEstimate * 10) / 10,
      difficulty: input.soilType,
      methodRecommended: diameter > 2 ? 'Power Equipment' : 'Manual Tools'
    },
    materials,
    estimatedCost: {
      labor: Math.round(laborCost),
      materials: Math.round(materialsCost),
      equipment: Math.round(equipmentCost),
      total: Math.round(laborCost + materialsCost + equipmentCost)
    },
    recommendations
  };
}