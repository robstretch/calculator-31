import { StairDimensions, StairResult } from './types';

const LUMBER_PRICES = {
  '2x12': 25,  // Price per board
  '2x6': 12,   // Price per board
  '1x8': 15    // Price per board
};

const HARDWARE_COST_PER_STEP = 15; // Hangers, screws, etc.

function checkCodeCompliance(
  riserHeight: number,
  treadDepth: number,
  angle: number
): { isWithinCode: boolean; violations: string[]; } {
  const violations: string[] = [];

  if (riserHeight < 4) violations.push('Riser height below minimum (4")');
  if (riserHeight > 7.75) violations.push('Riser height exceeds maximum (7.75")');
  if (treadDepth < 10) violations.push('Tread depth below minimum (10")');
  if (angle < 20) violations.push('Stair angle too shallow (min 20°)');
  if (angle > 37) violations.push('Stair angle too steep (max 37°)');

  return {
    isWithinCode: violations.length === 0,
    violations
  };
}

export function calculateStairs(dimensions: StairDimensions): StairResult {
  // Calculate basic dimensions
  const numberOfSteps = Math.round(dimensions.totalRise / 7); // Aim for ~7" risers
  const riserHeight = dimensions.totalRise / numberOfSteps;
  const treadDepth = dimensions.totalRun / (numberOfSteps - 1);
  const angle = Math.atan(dimensions.totalRise / dimensions.totalRun) * (180 / Math.PI);
  const totalLength = Math.sqrt(
    Math.pow(dimensions.totalRise, 2) + Math.pow(dimensions.totalRun, 2)
  );

  // Check code compliance
  const { isWithinCode, violations } = checkCodeCompliance(riserHeight, treadDepth, angle);

  // Calculate materials needed
  const width = dimensions.width || 36; // Default 36" width if not specified
  const stringers = Math.ceil(width / 16) + 1; // One stringer every 16", plus one
  
  // Calculate lumber needs
  const stringerLength = Math.ceil(totalLength / 12) * 12; // Round up to nearest foot
  const lumberNeeded = [
    {
      type: '2x12',
      amount: stringers,
      unit: 'boards'
    },
    {
      type: '2x6',
      amount: numberOfSteps,
      unit: 'boards'
    },
    {
      type: '1x8',
      amount: numberOfSteps - 1,
      unit: 'boards'
    }
  ];

  // Calculate costs
  const lumberCost = 
    (stringers * LUMBER_PRICES['2x12']) +
    (numberOfSteps * LUMBER_PRICES['2x6']) +
    ((numberOfSteps - 1) * LUMBER_PRICES['1x8']);
  
  const hardwareCost = numberOfSteps * HARDWARE_COST_PER_STEP;

  return {
    numberOfSteps,
    riserHeight,
    treadDepth,
    totalLength,
    angle,
    isWithinCode,
    codeViolations: violations,
    materials: {
      stringers,
      treads: numberOfSteps,
      risers: numberOfSteps - 1,
      lumber: lumberNeeded
    },
    estimatedCost: {
      lumber: lumberCost,
      hardware: hardwareCost,
      total: lumberCost + hardwareCost
    }
  };
}