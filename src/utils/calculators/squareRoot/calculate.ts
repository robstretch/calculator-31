import { SquareRootResult } from './types';

function newtonMethod(n: number, precision: number = 10): number {
  let x = n;
  let root = 1;
  const steps: string[] = [];
  
  // Newton's method: x(k+1) = (x(k) + n/x(k))/2
  for (let i = 0; i < precision && Math.abs(root - x) > 0.0000001; i++) {
    root = x;
    x = (x + n / x) / 2;
    steps.push(`Iteration ${i + 1}: ${x.toFixed(6)}`);
  }
  
  return x;
}

export function calculateSquareRoot(
  number: number,
  precision: number = 10
): SquareRootResult {
  if (number < 0) {
    throw new Error('Cannot calculate square root of negative number');
  }

  const steps: string[] = [];
  steps.push(`Starting calculation for √${number}`);

  // Calculate using Newton's method
  const newtonResult = newtonMethod(number, precision);
  
  // Calculate using built-in Math.sqrt for comparison
  const mathSqrt = Math.sqrt(number);
  
  // Calculate using power method for comparison
  const powerMethod = Math.pow(number, 0.5);

  return {
    result: newtonResult,
    steps,
    approximationMethod: "Newton's Method",
    precision,
    alternativeMethods: [
      { method: 'Built-in Math.sqrt', value: mathSqrt },
      { method: 'Power Method', value: powerMethod }
    ]
  };
}