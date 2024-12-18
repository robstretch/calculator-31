import { GCDInput, GCDResult } from './types';

function calculateGCDPair(a: number, b: number): { gcd: number; steps: { numbers: number[]; explanation: string; }[] } {
  const steps = [];
  let x = Math.abs(a);
  let y = Math.abs(b);

  steps.push({
    numbers: [x, y],
    explanation: 'Start with initial numbers'
  });

  while (y !== 0) {
    const remainder = x % y;
    steps.push({
      numbers: [x, y],
      explanation: `${x} = ${Math.floor(x/y)} × ${y} + ${remainder}`
    });
    x = y;
    y = remainder;
  }

  return { gcd: x, steps };
}

function getPrimeFactors(n: number): number[] {
  const factors: number[] = [];
  let num = Math.abs(n);
  
  for (let i = 2; i <= num; i++) {
    while (num % i === 0) {
      factors.push(i);
      num = num / i;
    }
  }
  
  return factors;
}

export function calculateGCD(input: GCDInput): GCDResult {
  const steps = [];
  let currentGCD = Math.abs(input.numbers[0]);
  
  // Calculate GCD using Euclidean algorithm
  for (let i = 1; i < input.numbers.length; i++) {
    const result = calculateGCDPair(currentGCD, input.numbers[i]);
    steps.push(...result.steps);
    currentGCD = result.gcd;
  }

  // Calculate prime factors for each number
  const factors = input.numbers.map(num => ({
    number: num,
    primeFactors: getPrimeFactors(num)
  }));

  // Properties of GCD
  const properties = [
    {
      category: 'Commutative',
      description: 'GCD(a,b) = GCD(b,a)'
    },
    {
      category: 'Associative',
      description: 'GCD(a,GCD(b,c)) = GCD(GCD(a,b),c)'
    },
    {
      category: 'Divisibility',
      description: 'GCD(a,b) divides both a and b'
    },
    {
      category: 'Linear Combination',
      description: 'GCD(a,b) = ax + by for some integers x,y'
    }
  ];

  // Real-world applications
  const applications = [
    {
      field: 'Fractions',
      example: 'Simplifying fractions to lowest terms'
    },
    {
      field: 'Cryptography',
      example: 'RSA algorithm and key generation'
    },
    {
      field: 'Computer Graphics',
      example: 'Finding common screen resolutions'
    },
    {
      field: 'Music Theory',
      example: 'Analyzing rhythm patterns and time signatures'
    }
  ];

  return {
    gcd: currentGCD,
    steps,
    factors,
    properties,
    applications
  };
}