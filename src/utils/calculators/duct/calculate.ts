import { DuctInput, DuctResult } from './types';

const VELOCITY_RANGES = {
  residential: { min: 600, max: 1000 },
  commercial: { min: 1000, max: 1500 },
  industrial: { min: 1500, max: 2500 }
};

function calculateRoundDuct(cfm: number, velocity: number): number {
  // A = Q/V where A is area in sq ft, Q is CFM, V is velocity
  const area = cfm / velocity;
  // Convert to square inches and calculate diameter
  return Math.sqrt((area * 144) / Math.PI) * 2;
}

function calculateRectangularDuct(
  cfm: number, 
  velocity: number, 
  maxAspectRatio: number = 4
): { width: number; height: number; } {
  // Calculate required area in square inches
  const area = (cfm / velocity) * 144;
  
  // Find optimal dimensions maintaining aspect ratio
  let width = Math.sqrt(area * maxAspectRatio);
  let height = area / width;
  
  // Round to nearest 2 inches
  width = Math.ceil(width / 2) * 2;
  height = Math.ceil(height / 2) * 2;
  
  return { width, height };
}

function calculatePressureLoss(
  velocity: number,
  hydraulicDiameter: number,
  length: number = 100
): number {
  // Simplified pressure loss calculation using friction factor
  const frictionFactor = 0.0001; // Approximate for typical duct
  return (frictionFactor * length * Math.pow(velocity, 2)) / (2 * hydraulicDiameter);
}

export function calculateDuct(input: DuctInput): DuctResult {
  let size: { diameter?: number; width?: number; height?: number; area: number; };
  
  if (input.shape === 'round') {
    const diameter = calculateRoundDuct(input.airflow, input.velocity);
    size = {
      diameter: Math.ceil(diameter),
      area: Math.PI * Math.pow(diameter / 2, 2)
    };
  } else {
    const { width, height } = calculateRectangularDuct(
      input.airflow,
      input.velocity,
      input.maxAspectRatio
    );
    size = {
      width,
      height,
      area: width * height
    };
  }

  // Calculate actual velocity based on final dimensions
  const actualVelocity = (input.airflow * 144) / size.area;

  // Calculate pressure components
  const velocityPressure = Math.pow(actualVelocity / 4005, 2);
  const hydraulicDiameter = input.shape === 'round' 
    ? size.diameter!
    : (2 * size.width! * size.height!) / (size.width! + size.height!);
  const frictionLoss = calculatePressureLoss(actualVelocity, hydraulicDiameter);

  const recommendations = [
    {
      category: 'Velocity',
      suggestion: actualVelocity < VELOCITY_RANGES.residential.min
        ? 'Increase velocity to prevent settling'
        : actualVelocity > VELOCITY_RANGES.commercial.max
        ? 'Reduce velocity to minimize noise and energy loss'
        : 'Velocity is within recommended range'
    },
    {
      category: 'Size',
      suggestion: input.shape === 'rectangular' && 
        (size.width! / size.height! > 4 || size.height! / size.width! > 4)
        ? 'Consider using multiple ducts or different aspect ratio'
        : 'Size dimensions are appropriate'
    },
    {
      category: 'Installation',
      suggestion: 'Ensure proper sealing and insulation'
    },
    {
      category: 'Maintenance',
      suggestion: 'Schedule regular inspections and cleaning'
    }
  ];

  return {
    size,
    pressure: {
      velocityPressure,
      frictionLoss,
      totalPressure: velocityPressure + frictionLoss
    },
    velocity: {
      actual: actualVelocity,
      recommended: VELOCITY_RANGES.residential
    },
    recommendations
  };
}