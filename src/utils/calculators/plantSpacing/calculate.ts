import { PlantSpacingInput, PlantSpacingResult } from './types';

function convertToMeters(value: number, unit: string): number {
  switch (unit) {
    case 'inches': return value * 0.0254;
    case 'feet': return value * 0.3048;
    case 'centimeters': return value * 0.01;
    default: return value;
  }
}

function convertFromMeters(value: number, unit: string): number {
  switch (unit) {
    case 'inches': return value / 0.0254;
    case 'feet': return value / 0.3048;
    case 'centimeters': return value / 0.01;
    default: return value;
  }
}

export function calculatePlantSpacing(input: PlantSpacingInput): PlantSpacingResult {
  // Convert all measurements to meters for calculations
  const length = convertToMeters(input.plotLength, input.unit);
  const width = convertToMeters(input.plotWidth, input.unit);
  const plantSpacing = convertToMeters(input.plantSpacing, input.unit);
  const rowSpacing = convertToMeters(input.rowSpacing, input.unit);

  // Calculate number of plants and rows
  const plantsPerRow = Math.floor((width - plantSpacing) / plantSpacing + 1);
  const numberOfRows = Math.floor((length - rowSpacing) / rowSpacing + 1);
  const totalPlants = plantsPerRow * numberOfRows;

  // Calculate coverage
  const totalArea = length * width;
  const usedArea = (plantsPerRow * plantSpacing) * (numberOfRows * rowSpacing);
  const percentageUsed = (usedArea / totalArea) * 100;

  // Convert spacing back to original units
  const spacingInUnits = {
    betweenPlants: convertFromMeters(plantSpacing, input.unit),
    betweenRows: convertFromMeters(rowSpacing, input.unit),
    fromEdges: convertFromMeters(plantSpacing / 2, input.unit)
  };

  const patterns = [
    {
      type: 'Square',
      description: 'Equal spacing in rows and columns',
      efficiency: 78
    },
    {
      type: 'Triangular',
      description: 'Staggered rows for better space utilization',
      efficiency: 90
    },
    {
      type: 'Hexagonal',
      description: 'Optimal spacing for maximum density',
      efficiency: 92
    }
  ];

  const recommendations = [
    {
      category: 'Spacing',
      suggestion: plantSpacing < rowSpacing ? 
        'Consider wider plant spacing for better air circulation' :
        'Good spacing ratio for optimal growth'
    },
    {
      category: 'Layout',
      suggestion: percentageUsed < 70 ?
        'Consider triangular pattern to utilize space better' :
        'Good space utilization with current layout'
    },
    {
      category: 'Edge Distance',
      suggestion: 'Maintain half spacing distance from plot edges'
    },
    {
      category: 'Density',
      suggestion: totalPlants / totalArea > 4 ?
        'High density planting - ensure adequate nutrients' :
        'Good plant density for optimal growth'
    }
  ];

  return {
    plantsPerRow,
    numberOfRows,
    totalPlants,
    coverage: {
      area: totalArea,
      percentageUsed
    },
    spacing: spacingInUnits,
    recommendations,
    plantingPattern: patterns
  };
}