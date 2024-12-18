import { FiberInput, FiberResult } from './types';

const FIBER_SOURCES = [
  { food: 'Black Beans', servingSize: '1 cup', fiberContent: 15 },
  { food: 'Lentils', servingSize: '1 cup', fiberContent: 15.6 },
  { food: 'Avocado', servingSize: '1 medium', fiberContent: 13.5 },
  { food: 'Raspberries', servingSize: '1 cup', fiberContent: 8 },
  { food: 'Pear', servingSize: '1 medium', fiberContent: 5.5 },
  { food: 'Oatmeal', servingSize: '1 cup cooked', fiberContent: 4 },
  { food: 'Almonds', servingSize: '1 oz (23 nuts)', fiberContent: 3.5 },
  { food: 'Broccoli', servingSize: '1 cup cooked', fiberContent: 5.1 }
];

function calculateDailyNeeds(input: FiberInput): number {
  let baseNeeds: number;

  if (input.age <= 3) baseNeeds = 19;
  else if (input.age <= 8) baseNeeds = 25;
  else if (input.age <= 13) baseNeeds = input.gender === 'male' ? 31 : 26;
  else if (input.age <= 18) baseNeeds = input.gender === 'male' ? 38 : 26;
  else baseNeeds = input.gender === 'male' ? 38 : 25;

  // Adjust for activity level
  const activityMultiplier = {
    sedentary: 1,
    moderate: 1.1,
    active: 1.2
  }[input.activityLevel];

  // Adjust for pregnancy/breastfeeding
  if (input.pregnant) baseNeeds += 3;
  if (input.breastfeeding) baseNeeds += 5;

  return baseNeeds * activityMultiplier;
}

export function calculateFiber(input: FiberInput): FiberResult {
  const recommendedAmount = calculateDailyNeeds(input);

  // Calculate ranges
  const dailyNeeds = {
    minimum: Math.round(recommendedAmount * 0.8),
    recommended: Math.round(recommendedAmount),
    maximum: Math.round(recommendedAmount * 1.4)
  };

  // Calculate servings needed from different sources
  const sources = FIBER_SOURCES.map(source => ({
    ...source,
    servingsNeeded: Math.round((recommendedAmount / source.fiberContent) * 10) / 10
  }));

  // Calculate breakdown by fiber type
  const breakdown = [
    {
      category: 'Soluble Fiber',
      amount: Math.round(recommendedAmount * 0.4),
      percentage: 40
    },
    {
      category: 'Insoluble Fiber',
      amount: Math.round(recommendedAmount * 0.6),
      percentage: 60
    }
  ];

  // Generate recommendations
  const recommendations = [
    {
      category: 'Water Intake',
      suggestion: 'Increase water intake as you increase fiber consumption'
    },
    {
      category: 'Gradual Increase',
      suggestion: 'Add fiber gradually to prevent digestive discomfort'
    },
    {
      category: 'Timing',
      suggestion: 'Spread fiber intake throughout the day rather than all at once'
    },
    {
      category: 'Food Sources',
      suggestion: input.activityLevel === 'active' ?
        'Focus on whole grains and legumes for sustained energy' :
        'Include a variety of fruits and vegetables'
    }
  ];

  return {
    dailyNeeds,
    sources,
    breakdown,
    recommendations
  };
}