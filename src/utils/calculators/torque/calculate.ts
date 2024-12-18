import { TorqueInput, TorqueResult } from './types';

const CONVERSION_FACTORS = {
  newtonMetersToFootPounds: 0.737562,
  newtonMetersToInchPounds: 8.85074,
  footPoundsToNewtonMeters: 1.35582
};

function convertToMetric(value: number, unit: 'force' | 'distance', from: 'imperial'): number {
  if (unit === 'force') {
    return value * 4.44822; // lbf to N
  }
  return value * 0.3048; // ft to m
}

export function calculateTorque(input: TorqueInput): TorqueResult {
  // Convert to metric if needed
  const force = input.unit === 'imperial' ? convertToMetric(input.force, 'force', 'imperial') : input.force;
  const radius = input.unit === 'imperial' ? convertToMetric(input.radius, 'distance', 'imperial') : input.radius;
  const angle = input.angle || 90;

  // Calculate torque components
  const angleRad = angle * (Math.PI / 180);
  const perpendicular = force * Math.sin(angleRad);
  const parallel = force * Math.cos(angleRad);

  // Calculate torque (τ = F * r * sin(θ))
  const torque = force * radius * Math.sin(angleRad);

  // Calculate equivalent units
  const equivalents = {
    newtonMeters: torque,
    footPounds: torque * CONVERSION_FACTORS.newtonMetersToFootPounds,
    inchPounds: torque * CONVERSION_FACTORS.newtonMetersToInchPounds
  };

  const calculations = [
    {
      step: 'Force Components',
      formula: 'F⊥ = F * sin(θ)',
      result: perpendicular
    },
    {
      step: 'Torque Calculation',
      formula: 'τ = F * r * sin(θ)',
      result: torque
    },
    {
      step: 'Unit Conversion',
      formula: 'T(ft-lb) = T(N-m) * 0.737562',
      result: equivalents.footPounds
    }
  ];

  const recommendations = [
    {
      category: 'Force Application',
      suggestion: angle < 90 ?
        'Increase angle towards 90° for maximum torque' :
        'Optimal angle for maximum torque'
    },
    {
      category: 'Efficiency',
      suggestion: angle < 45 ?
        'Force application is inefficient - increase angle' :
        'Good force application efficiency'
    },
    {
      category: 'Tool Selection',
      suggestion: torque > 200 ?
        'Consider using power tools or mechanical advantage' :
        'Hand tools suitable for this torque'
    },
    {
      category: 'Safety',
      suggestion: 'Ensure proper tool rating for calculated torque'
    }
  ];

  return {
    torque: Math.round(torque * 100) / 100,
    components: {
      perpendicular: Math.round(perpendicular * 100) / 100,
      parallel: Math.round(parallel * 100) / 100
    },
    equivalents,
    calculations,
    recommendations
  };
}