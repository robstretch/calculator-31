export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface FractionResult {
  result: Fraction;
  simplified: Fraction;
  decimal: number;
  steps: string[];
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export function simplifyFraction(fraction: Fraction): Fraction {
  const divisor = gcd(fraction.numerator, fraction.denominator);
  return {
    numerator: fraction.numerator / divisor,
    denominator: fraction.denominator / divisor
  };
}

export function calculateFraction(
  fraction1: Fraction,
  fraction2: Fraction,
  operation: 'add' | 'subtract' | 'multiply' | 'divide'
): FractionResult {
  const steps: string[] = [];
  let result: Fraction;

  switch (operation) {
    case 'add':
    case 'subtract': {
      const commonDenominator = lcm(fraction1.denominator, fraction2.denominator);
      const multiplier1 = commonDenominator / fraction1.denominator;
      const multiplier2 = commonDenominator / fraction2.denominator;
      
      steps.push(`Find common denominator: ${commonDenominator}`);
      steps.push(`Multiply first fraction by ${multiplier1}/${multiplier1}`);
      steps.push(`Multiply second fraction by ${multiplier2}/${multiplier2}`);

      const newNumerator1 = fraction1.numerator * multiplier1;
      const newNumerator2 = fraction2.numerator * multiplier2;

      result = {
        numerator: operation === 'add' ? newNumerator1 + newNumerator2 : newNumerator1 - newNumerator2,
        denominator: commonDenominator
      };
      break;
    }
    
    case 'multiply':
      result = {
        numerator: fraction1.numerator * fraction2.numerator,
        denominator: fraction1.denominator * fraction2.denominator
      };
      steps.push('Multiply numerators and denominators');
      break;
    
    case 'divide':
      result = {
        numerator: fraction1.numerator * fraction2.denominator,
        denominator: fraction1.denominator * fraction2.numerator
      };
      steps.push('Multiply by reciprocal of second fraction');
      break;
  }

  const simplified = simplifyFraction(result);
  if (simplified.numerator !== result.numerator || simplified.denominator !== result.denominator) {
    steps.push(`Simplify by dividing both numbers by ${gcd(result.numerator, result.denominator)}`);
  }

  return {
    result,
    simplified,
    decimal: simplified.numerator / simplified.denominator,
    steps
  };
}