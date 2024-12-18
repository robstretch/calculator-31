import { ProjectileMotionInput, ProjectileMotionResult } from './types';

const DEFAULT_GRAVITY = 9.81; // m/s²
const AIR_RESISTANCE_COEFFICIENT = 0.1; // Simplified coefficient

function calculateTrajectoryPoint(
  v0: number,
  angle: number,
  h0: number,
  t: number,
  g: number,
  useAirResistance: boolean
): { x: number; y: number } {
  const radians = angle * Math.PI / 180;
  const v0x = v0 * Math.cos(radians);
  const v0y = v0 * Math.sin(radians);

  if (useAirResistance) {
    // Simplified air resistance model
    const x = v0x * t * Math.exp(-AIR_RESISTANCE_COEFFICIENT * t);
    const y = h0 + v0y * t * Math.exp(-AIR_RESISTANCE_COEFFICIENT * t) - 
      (g * t * t) / 2;
    return { x, y };
  } else {
    // Ideal projectile motion
    const x = v0x * t;
    const y = h0 + v0y * t - (g * t * t) / 2;
    return { x, y };
  }
}

export function calculateProjectileMotion(input: ProjectileMotionInput): ProjectileMotionResult {
  const g = input.gravity || DEFAULT_GRAVITY;
  const radians = input.angle * Math.PI / 180;
  const v0x = input.initialVelocity * Math.cos(radians);
  const v0y = input.initialVelocity * Math.sin(radians);

  // Calculate time of flight
  let timeOfFlight: number;
  if (input.airResistance) {
    // Numerical approximation for air resistance
    timeOfFlight = (-v0y + Math.sqrt(v0y * v0y + 2 * g * input.height)) / g;
    timeOfFlight *= 1.1; // Adjustment for air resistance
  } else {
    // Quadratic formula for ideal case
    const a = -g / 2;
    const b = v0y;
    const c = input.height;
    timeOfFlight = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  }

  // Calculate maximum height
  const maxHeight = input.height + (v0y * v0y) / (2 * g);

  // Calculate range
  const range = v0x * timeOfFlight;

  // Generate trajectory points
  const trajectory = [];
  const steps = 50;
  const dt = timeOfFlight / steps;

  for (let i = 0; i <= steps; i++) {
    const t = i * dt;
    const point = calculateTrajectoryPoint(
      input.initialVelocity,
      input.angle,
      input.height,
      t,
      g,
      input.airResistance || false
    );
    trajectory.push({ ...point, time: t });
  }

  const calculations = [
    {
      step: 'Initial Velocity Components',
      formula: 'v₀x = v₀cos(θ), v₀y = v₀sin(θ)',
      result: v0x
    },
    {
      step: 'Time of Flight',
      formula: 't = (-v₀y ± √(v₀y² + 2gh₀))/g',
      result: timeOfFlight
    },
    {
      step: 'Maximum Height',
      formula: 'h_max = h₀ + v₀y²/(2g)',
      result: maxHeight
    },
    {
      step: 'Range',
      formula: 'R = v₀x × t',
      result: range
    }
  ];

  const recommendations = [
    {
      category: 'Angle Optimization',
      suggestion: Math.abs(input.angle - 45) > 15 ?
        'Consider 45° for maximum range on level ground' :
        'Good angle choice for maximum range'
    },
    {
      category: 'Air Resistance',
      suggestion: input.initialVelocity > 20 ?
        'Air resistance becomes significant at high velocities' :
        'Air resistance effects are minimal'
    },
    {
      category: 'Initial Height',
      suggestion: input.height > 0 ?
        'Account for increased range due to elevation' :
        'Consider elevated launch for increased range'
    },
    {
      category: 'Safety',
      suggestion: 'Ensure clear landing zone within calculated range'
    }
  ];

  return {
    maxHeight,
    range,
    timeOfFlight,
    trajectory,
    components: {
      horizontal: v0x,
      vertical: v0y
    },
    calculations,
    recommendations
  };
}