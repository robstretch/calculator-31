import { GearRatioInput, GearRatioResult } from './types';

const EFFICIENCY_FACTORS = {
  spur: 0.98,
  helical: 0.97,
  bevel: 0.95,
  worm: 0.70
};

export function calculateGearRatio(input: GearRatioInput): GearRatioResult {
  // Calculate basic ratio
  const ratio = input.drivenTeeth / input.drivingTeeth;
  
  // Calculate output speed if input RPM provided
  const outputSpeed = input.rpm ? input.rpm / ratio : undefined;
  
  // Calculate torque multiplier (inverse of speed ratio)
  const torqueMultiplier = 1 / ratio;
  
  // Estimate efficiency based on gear type
  const efficiency = input.type === 'reduction' ? EFFICIENCY_FACTORS.spur : EFFICIENCY_FACTORS.helical;

  // Generate analysis points
  const analysis = [
    {
      type: 'Gear Ratio',
      value: ratio,
      description: ratio > 1 ? 'Speed reduction' : 'Speed increase'
    },
    {
      type: 'Torque Multiplier',
      value: torqueMultiplier,
      description: torqueMultiplier > 1 ? 'Torque increase' : 'Torque reduction'
    },
    {
      type: 'Mechanical Advantage',
      value: ratio * efficiency,
      description: 'Effective force multiplication'
    }
  ];

  // Common applications
  const applications = [
    {
      field: 'Automotive',
      example: 'Final drive ratio',
      typicalRatio: '3:1 to 4.5:1'
    },
    {
      field: 'Industrial',
      example: 'Conveyor systems',
      typicalRatio: '10:1 to 60:1'
    },
    {
      field: 'Robotics',
      example: 'Servo motors',
      typicalRatio: '5:1 to 100:1'
    }
  ];

  // Generate recommendations
  const recommendations = [
    {
      category: 'Gear Selection',
      suggestion: ratio > 10 ?
        'Consider multi-stage reduction for high ratios' :
        'Single stage reduction is suitable'
    },
    {
      category: 'Efficiency',
      suggestion: efficiency < 0.9 ?
        'Consider using helical gears for better efficiency' :
        'Good efficiency with current configuration'
    },
    {
      category: 'Maintenance',
      suggestion: 'Regular lubrication and inspection recommended'
    },
    {
      category: 'Design',
      suggestion: ratio > 5 ?
        'Ensure adequate shaft support for high loads' :
        'Standard bearing configuration suitable'
    }
  ];

  return {
    ratio,
    outputSpeed,
    torqueMultiplier,
    efficiency,
    analysis,
    applications,
    recommendations
  };
}