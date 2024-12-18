import { OddsConversion } from './types';

export function convertAmericanToDecimal(american: number): number {
  if (american > 0) {
    return (american / 100) + 1;
  } else {
    return (100 / Math.abs(american)) + 1;
  }
}

export function convertDecimalToAmerican(decimal: number): string {
  if (decimal >= 2) {
    return `+${Math.round((decimal - 1) * 100)}`;
  } else {
    return Math.round(-100 / (decimal - 1)).toString();
  }
}

export function convertDecimalToFractional(decimal: number): string {
  const tolerance = 1e-6;
  let numerator = Math.round((decimal - 1) * 100);
  let denominator = 100;
  
  // Simplify fraction
  const gcd = (a: number, b: number): number => b < tolerance ? a : gcd(b, a % b);
  const divisor = gcd(numerator, denominator);
  
  numerator = Math.round(numerator / divisor);
  denominator = Math.round(denominator / divisor);
  
  return `${numerator}/${denominator}`;
}

export function convertFractionalToDecimal(fractional: string): number {
  const [numerator, denominator] = fractional.split('/').map(Number);
  return (numerator / denominator) + 1;
}

export function convertOdds(
  value: string | number,
  fromFormat: 'american' | 'decimal' | 'fractional'
): OddsConversion {
  let decimal: number;

  // Convert input to decimal odds first
  if (fromFormat === 'american') {
    decimal = convertAmericanToDecimal(Number(value));
  } else if (fromFormat === 'decimal') {
    decimal = Number(value);
  } else {
    decimal = convertFractionalToDecimal(value.toString());
  }

  return {
    decimal,
    american: convertDecimalToAmerican(decimal),
    fractional: convertDecimalToFractional(decimal)
  };
}