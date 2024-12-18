export interface ArrowSpeedResult {
  speed: number;
  kineticEnergy: number;
  momentum: number;
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  speedRating: string;
  effectiveRange: {
    hunting: number;
    target: number;
  };
}

export function calculateArrowSpeed(
  drawWeight: number,
  drawLength: number,
  arrowWeight: number,
  bowEfficiency: number = 75
): ArrowSpeedResult {
  // Calculate initial arrow speed using modified AMO formula
  const speed = Math.round(
    (drawWeight * drawLength * bowEfficiency) / (arrowWeight * 0.3) * 0.95
  );

  // Calculate kinetic energy (KE = 1/2 * mass * velocity^2)
  const kineticEnergy = Math.round(
    (arrowWeight * Math.pow(speed, 2)) / (450240) * 100
  ) / 100;

  // Calculate momentum (p = mass * velocity)
  const momentum = Math.round(
    (arrowWeight * speed) / 225120 * 100
  ) / 100;

  // Determine speed rating
  let speedRating: string;
  if (speed < 250) speedRating = 'Low';
  else if (speed < 300) speedRating = 'Moderate';
  else if (speed < 350) speedRating = 'Fast';
  else speedRating = 'Very Fast';

  // Calculate effective ranges
  const effectiveRange = {
    hunting: Math.round(speed * 0.2), // Approximate hunting range in yards
    target: Math.round(speed * 0.3)   // Approximate target range in yards
  };

  // Generate recommendations based on speed and energy
  const recommendations = [
    {
      category: 'Arrow Selection',
      suggestion: speed > 300 
        ? 'Use heavier arrows for better stability'
        : 'Current arrow weight is suitable for this speed'
    },
    {
      category: 'Hunting Setup',
      suggestion: kineticEnergy > 40
        ? 'Suitable for large game hunting'
        : 'Better suited for small to medium game'
    },
    {
      category: 'Target Practice',
      suggestion: `Optimal practice distance: ${effectiveRange.target} yards`
    },
    {
      category: 'Equipment',
      suggestion: bowEfficiency < 80
        ? 'Consider bow tuning to improve efficiency'
        : 'Bow is performing efficiently'
    }
  ];

  return {
    speed,
    kineticEnergy,
    momentum,
    recommendations,
    speedRating,
    effectiveRange
  };
}