import { PaverInput, PaverResult } from './types';

const PATTERN_DETAILS = {
  'running-bond': { efficiency: 0.98, difficulty: 'Easy', wastage: 0.05 },
  'herringbone': { efficiency: 0.95, difficulty: 'Moderate', wastage: 0.08 },
  'basketweave': { efficiency: 0.96, difficulty: 'Moderate', wastage: 0.07 },
  'stack-bond': { efficiency: 0.99, difficulty: 'Easy', wastage: 0.05 }
};

const MATERIAL_PRICES = {
  paver: 2.50,      // Per square foot
  sand: 30,         // Per cubic yard
  gravel: 35,       // Per cubic yard
  edging: 3.50      // Per linear foot
};

function calculatePaverQuantity(
  area: number,
  paverLength: number,
  paverWidth: number,
  pattern: string
): number {
  const paverArea = (paverLength * paverWidth) / 144; // Convert to square feet
  const patternEfficiency = PATTERN_DETAILS[pattern as keyof typeof PATTERN_DETAILS].efficiency;
  return Math.ceil(area / (paverArea * patternEfficiency));
}

export function calculatePaver(input: PaverInput): PaverResult {
  // Calculate total area including slope adjustment
  let totalArea = input.length * input.width;
  if (input.slopePercent) {
    totalArea *= (1 + (input.slopePercent / 100));
  }

  // Calculate materials needed
  const paversNeeded = calculatePaverQuantity(
    totalArea,
    input.paverLength,
    input.paverWidth,
    input.pattern
  );

  // Calculate sand needs (base 4", bedding 1", joint sand)
  const sandNeeded = {
    base: (totalArea * (4/12)) / 27,     // 4" depth converted to cubic yards
    bedding: (totalArea * (1/12)) / 27,  // 1" depth
    joint: (totalArea * 0.0083) / 27     // Approximately 1/8" joints
  };

  // Calculate gravel base (6" depth)
  const gravelNeeded = (totalArea * (6/12)) / 27;

  // Calculate edging if requested
  const edgingNeeded = input.edging ? 
    2 * (input.length + input.width) : undefined;

  // Calculate costs
  const costs = {
    pavers: paversNeeded * ((input.paverLength * input.paverWidth) / 144) * MATERIAL_PRICES.paver,
    sand: (sandNeeded.base + sandNeeded.bedding + sandNeeded.joint) * MATERIAL_PRICES.sand,
    gravel: gravelNeeded * MATERIAL_PRICES.gravel,
    edging: edgingNeeded ? edgingNeeded * MATERIAL_PRICES.edging : 0
  };

  const pattern = {
    name: input.pattern,
    ...PATTERN_DETAILS[input.pattern as keyof typeof PATTERN_DETAILS]
  };

  const recommendations = [
    {
      category: 'Base Preparation',
      suggestion: input.slopePercent && input.slopePercent > 2 ?
        'Install drainage system and ensure proper compaction' :
        'Ensure proper compaction of base materials'
    },
    {
      category: 'Pattern Selection',
      suggestion: pattern.difficulty === 'Moderate' ?
        'Consider professional installation for complex pattern' :
        'Pattern suitable for DIY installation'
    },
    {
      category: 'Material Handling',
      suggestion: 'Order extra pavers for cuts and future repairs'
    },
    {
      category: 'Installation',
      suggestion: input.edging ?
        'Install edge restraints before laying pavers' :
        'Consider adding edge restraints for better stability'
    }
  ];

  return {
    totalArea,
    paversNeeded,
    sandNeeded,
    gravelNeeded,
    edgingNeeded,
    wastageRecommended: pattern.wastage * 100,
    pattern: {
      name: input.pattern,
      efficiency: pattern.efficiency * 100,
      difficulty: pattern.difficulty
    },
    estimatedCost: {
      pavers: Math.round(costs.pavers),
      sand: Math.round(costs.sand),
      gravel: Math.round(costs.gravel),
      edging: input.edging ? Math.round(costs.edging) : undefined,
      total: Math.round(Object.values(costs).reduce((a, b) => a + b, 0))
    },
    recommendations
  };
}