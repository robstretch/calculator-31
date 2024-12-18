import { formatNumber } from '../format';

export interface OneRepMaxResult {
  oneRepMax: number;
  percentages: {
    percentage: number;
    weight: number;
    reps: number;
  }[];
  formula: string;
  estimatedMaxes: {
    formula: string;
    max: number;
  }[];
}

export function calculateOneRepMax(
  weight: number,
  reps: number
): OneRepMaxResult {
  // Calculate 1RM using different formulas
  const brzycki = weight * (36 / (37 - reps)); // Brzycki Formula
  const epley = weight * (1 + 0.0333 * reps); // Epley Formula
  const lander = (100 * weight) / (101.3 - 2.67123 * reps); // Lander Formula
  
  // Use average of formulas for final 1RM
  const oneRepMax = Math.round((brzycki + epley + lander) / 3);
  
  // Calculate common training percentages
  const percentages = [
    { percentage: 100, weight: oneRepMax, reps: 1 },
    { percentage: 95, weight: oneRepMax * 0.95, reps: 2 },
    { percentage: 90, weight: oneRepMax * 0.90, reps: 3 },
    { percentage: 85, weight: oneRepMax * 0.85, reps: 5 },
    { percentage: 80, weight: oneRepMax * 0.80, reps: 7 },
    { percentage: 75, weight: oneRepMax * 0.75, reps: 10 },
    { percentage: 70, weight: oneRepMax * 0.70, reps: 12 },
    { percentage: 65, weight: oneRepMax * 0.65, reps: 15 }
  ];

  return {
    oneRepMax,
    percentages,
    formula: `${formatNumber(weight)} × (1 + 0.0333 × ${reps})`,
    estimatedMaxes: [
      { formula: 'Brzycki', max: Math.round(brzycki) },
      { formula: 'Epley', max: Math.round(epley) },
      { formula: 'Lander', max: Math.round(lander) }
    ]
  };
}