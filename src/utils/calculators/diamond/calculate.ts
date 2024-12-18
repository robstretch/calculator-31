import { DiamondInput, DiamondResult } from './types';

const BASE_PRICE_PER_CARAT = 2000;

const CUT_MULTIPLIERS = {
  'Ideal': 1.2,
  'Excellent': 1.1,
  'Very Good': 1.0,
  'Good': 0.9,
  'Fair': 0.8,
  'Poor': 0.7
};

const COLOR_MULTIPLIERS = {
  'D': 1.3,
  'E': 1.2,
  'F': 1.1,
  'G': 1.0,
  'H': 0.9,
  'I': 0.8,
  'J': 0.7,
  'K': 0.6
};

const CLARITY_MULTIPLIERS = {
  'FL': 1.5,
  'IF': 1.4,
  'VVS1': 1.3,
  'VVS2': 1.2,
  'VS1': 1.1,
  'VS2': 1.0,
  'SI1': 0.9,
  'SI2': 0.8,
  'I1': 0.7,
  'I2': 0.6,
  'I3': 0.5
};

const SHAPE_MULTIPLIERS = {
  'Round': 1.0,
  'Princess': 0.9,
  'Cushion': 0.85,
  'Oval': 0.9,
  'Emerald': 0.85,
  'Pear': 0.8,
  'Marquise': 0.85,
  'Radiant': 0.85
};

export function calculateDiamond(input: DiamondInput): DiamondResult {
  // Calculate base price
  const basePrice = input.carat * BASE_PRICE_PER_CARAT;
  
  // Apply multipliers
  const cutMultiplier = CUT_MULTIPLIERS[input.cut];
  const colorMultiplier = COLOR_MULTIPLIERS[input.color];
  const clarityMultiplier = CLARITY_MULTIPLIERS[input.clarity];
  const shapeMultiplier = SHAPE_MULTIPLIERS[input.shape];
  
  // Calculate average price
  const averagePrice = basePrice * cutMultiplier * colorMultiplier * clarityMultiplier * shapeMultiplier;
  
  // Calculate price range (±15%)
  const priceRange = {
    low: Math.round(averagePrice * 0.85),
    high: Math.round(averagePrice * 1.15),
    average: Math.round(averagePrice)
  };

  // Calculate quality score (0-100)
  const qualityScore = Math.round(
    ((cutMultiplier - 0.7) / 0.5 * 0.4 +
    (colorMultiplier - 0.6) / 0.7 * 0.3 +
    (clarityMultiplier - 0.5) / 1.0 * 0.3) * 100
  );

  const characteristics = [
    {
      factor: 'Cut',
      rating: input.cut,
      impact: Math.round((cutMultiplier - 1) * 100)
    },
    {
      factor: 'Color',
      rating: input.color,
      impact: Math.round((colorMultiplier - 1) * 100)
    },
    {
      factor: 'Clarity',
      rating: input.clarity,
      impact: Math.round((clarityMultiplier - 1) * 100)
    },
    {
      factor: 'Shape',
      rating: input.shape,
      impact: Math.round((shapeMultiplier - 1) * 100)
    }
  ];

  // Calculate dimensions based on shape and carat
  const dimensions = calculateDimensions(input.carat, input.shape);

  const recommendations = [
    {
      category: 'Value Optimization',
      suggestion: input.cut === 'Ideal' || input.cut === 'Excellent' ?
        'Excellent cut choice for maximum brilliance' :
        'Consider upgrading cut grade for better sparkle'
    },
    {
      category: 'Color Selection',
      suggestion: ['D', 'E', 'F'].includes(input.color) ?
        'Premium color grade - consider G-H for better value' :
        'Good balance of color and value'
    },
    {
      category: 'Clarity Choice',
      suggestion: input.clarity === 'VVS2' || input.clarity === 'VS1' ?
        'Consider VS2 for better value - still eye-clean' :
        'Good clarity choice for value'
    },
    {
      category: 'Shape Selection',
      suggestion: input.shape === 'Round' ?
        'Classic choice - maximum brilliance' :
        'Fancy shape offers unique look and better value'
    }
  ];

  return {
    estimatedPrice: priceRange,
    qualityScore,
    characteristics,
    recommendations,
    specifications: dimensions
  };
}

function calculateDimensions(carat: number, shape: string): { dimension: string; value: number; description: string; }[] {
  const baseWidth = Math.sqrt(carat) * 6.5;
  
  switch (shape) {
    case 'Round':
      return [
        {
          dimension: 'Diameter',
          value: baseWidth,
          description: 'Width of the diamond'
        },
        {
          dimension: 'Depth',
          value: baseWidth * 0.6,
          description: 'Height from table to culet'
        }
      ];
    case 'Princess':
      return [
        {
          dimension: 'Width',
          value: baseWidth * 0.95,
          description: 'Side length of square'
        },
        {
          dimension: 'Depth',
          value: baseWidth * 0.7,
          description: 'Height from table to culet'
        }
      ];
    default:
      return [
        {
          dimension: 'Length',
          value: baseWidth * 1.3,
          description: 'Longest dimension'
        },
        {
          dimension: 'Width',
          value: baseWidth * 0.8,
          description: 'Shortest dimension'
        },
        {
          dimension: 'Depth',
          value: baseWidth * 0.6,
          description: 'Height from table to culet'
        }
      ];
  }
}