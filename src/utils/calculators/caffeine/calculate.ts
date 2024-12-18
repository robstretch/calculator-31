import { CaffeineInput, CaffeineResult } from './types';

const CAFFEINE_SOURCES = [
  { name: 'Coffee', servingSize: '8 oz cup', caffeineContent: 95 },
  { name: 'Espresso', servingSize: '1 oz shot', caffeineContent: 64 },
  { name: 'Black Tea', servingSize: '8 oz cup', caffeineContent: 47 },
  { name: 'Green Tea', servingSize: '8 oz cup', caffeineContent: 28 },
  { name: 'Cola', servingSize: '12 oz can', caffeineContent: 34 },
  { name: 'Energy Drink', servingSize: '8.4 oz can', caffeineContent: 80 },
  { name: 'Dark Chocolate', servingSize: '1 oz', caffeineContent: 12 }
];

const SENSITIVITY_FACTORS = {
  low: 1.2,
  normal: 1.0,
  high: 0.8
};

function calculateHalfLife(weight: number, unit: 'kg' | 'lbs', sensitivity: 'low' | 'normal' | 'high'): number {
  // Convert weight to kg if needed
  const weightKg = unit === 'lbs' ? weight * 0.453592 : weight;
  
  // Base half-life is 5 hours, adjusted for weight and sensitivity
  const baseHalfLife = 5;
  const weightFactor = Math.sqrt(weightKg / 70); // Normalized to 70kg reference weight
  return baseHalfLife * weightFactor * SENSITIVITY_FACTORS[sensitivity];
}

function calculateCaffeineLevel(
  amount: number,
  timeDiff: number,
  halfLife: number
): number {
  return amount * Math.pow(0.5, timeDiff / halfLife);
}

export function calculateCaffeine(input: CaffeineInput): CaffeineResult {
  const halfLife = calculateHalfLife(input.weight, input.unit, input.sensitivity);
  const metabolismRate = Math.log(2) / halfLife;

  // Sort consumptions by time
  const sortedConsumptions = [...input.consumptions].sort((a, b) => 
    new Date('1970/01/01 ' + a.time).getTime() - 
    new Date('1970/01/01 ' + b.time).getTime()
  );

  // Generate timeline
  const timeline = [];
  let currentLevel = 0;
  let peakLevel = 0;

  // Create 24-hour timeline
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const currentTime = new Date('1970/01/01 ' + timeStr);

      // Calculate caffeine level from each consumption
      currentLevel = sortedConsumptions.reduce((total, consumption) => {
        const consumptionTime = new Date('1970/01/01 ' + consumption.time);
        const timeDiff = (currentTime.getTime() - consumptionTime.getTime()) / (1000 * 60 * 60);
        
        if (timeDiff >= 0) {
          return total + calculateCaffeineLevel(consumption.amount, timeDiff, halfLife);
        }
        return total;
      }, 0);

      peakLevel = Math.max(peakLevel, currentLevel);

      let status: string;
      if (currentLevel < 50) status = 'Low';
      else if (currentLevel < 200) status = 'Moderate';
      else if (currentLevel < 400) status = 'High';
      else status = 'Excessive';

      timeline.push({
        time: timeStr,
        level: Math.round(currentLevel),
        status
      });
    }
  }

  const recommendations = [
    {
      category: 'Daily Limit',
      suggestion: peakLevel > 400 ?
        'Consider reducing caffeine intake' :
        'Caffeine intake within safe limits'
    },
    {
      category: 'Timing',
      suggestion: 'Avoid caffeine 6-8 hours before bedtime'
    },
    {
      category: 'Hydration',
      suggestion: 'Drink water alongside caffeinated beverages'
    },
    {
      category: 'Sensitivity',
      suggestion: input.sensitivity === 'high' ?
        'Consider switching to lower caffeine alternatives' :
        'Monitor your response to caffeine intake'
    }
  ];

  return {
    currentLevel: Math.round(currentLevel),
    peakLevel: Math.round(peakLevel),
    halfLife: Math.round(halfLife * 10) / 10,
    metabolismRate: Math.round(metabolismRate * 1000) / 1000,
    timeline,
    recommendations,
    sources: CAFFEINE_SOURCES
  };
}