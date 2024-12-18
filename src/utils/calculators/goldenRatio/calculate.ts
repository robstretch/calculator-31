import { GoldenRatioInput, GoldenRatioResult } from './types';

const PHI = (1 + Math.sqrt(5)) / 2; // Golden ratio ≈ 1.618033988749895

export function calculateGoldenRatio(input: GoldenRatioInput): GoldenRatioResult {
  const result = input.direction === 'up' ? 
    input.value * PHI : 
    input.value / PHI;

  // Generate Fibonacci-like sequence starting near input value
  const sequence: number[] = [];
  let a = input.value;
  let b = result;
  
  // Add 5 numbers in sequence
  for (let i = 0; i < 5; i++) {
    sequence.push(Math.round(a * 100) / 100);
    const next = a + b;
    a = b;
    b = next;
  }

  const proportions = [
    {
      dimension: 'Length',
      larger: Math.max(input.value, result),
      smaller: Math.min(input.value, result)
    },
    {
      dimension: 'Width',
      larger: input.value,
      smaller: input.value / PHI
    },
    {
      dimension: 'Height',
      larger: result,
      smaller: result / PHI
    }
  ];

  const applications = [
    {
      field: 'Architecture',
      example: 'Parthenon facade dimensions',
      ratio: 1.618
    },
    {
      field: 'Art',
      example: 'Mona Lisa canvas proportions',
      ratio: 1.618
    },
    {
      field: 'Nature',
      example: 'Nautilus shell spiral',
      ratio: 1.618
    },
    {
      field: 'Design',
      example: 'Logo proportions',
      ratio: 1.618
    }
  ];

  const recommendations = [
    {
      category: 'Design',
      suggestion: 'Use these proportions for visually pleasing layouts'
    },
    {
      category: 'Composition',
      suggestion: 'Place key elements at golden ratio points'
    },
    {
      category: 'Scaling',
      suggestion: 'Maintain ratio when resizing elements'
    },
    {
      category: 'Balance',
      suggestion: 'Use larger section for primary content'
    }
  ];

  return {
    result: Math.round(result * 1000) / 1000,
    ratio: Math.round(PHI * 1000000) / 1000000,
    sequence,
    proportions,
    applications,
    recommendations
  };
}