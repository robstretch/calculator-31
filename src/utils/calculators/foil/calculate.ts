import { FOILInput, FOILResult } from './types';

function formatTerm(coefficient: number, power: number = 0): string {
  if (coefficient === 0) return '';
  
  const sign = coefficient > 0 ? '+' : '-';
  const absCoeff = Math.abs(coefficient);
  const coeff = absCoeff === 1 && power > 0 ? '' : absCoeff.toString();
  
  if (power === 0) return `${sign} ${absCoeff}`;
  if (power === 1) return `${sign} ${coeff}x`;
  return `${sign} ${coeff}x²`;
}

export function calculateFOIL(input: FOILInput): FOILResult {
  // Calculate FOIL terms
  const terms = {
    first: input.firstBinomial.x * input.secondBinomial.x,
    outer: input.firstBinomial.x * input.secondBinomial.constant,
    inner: input.firstBinomial.constant * input.secondBinomial.x,
    last: input.firstBinomial.constant * input.secondBinomial.constant
  };

  // Combine like terms
  const simplified = {
    x2: terms.first,
    x: terms.outer + terms.inner,
    constant: terms.last,
    coefficient: terms.first !== 0 ? terms.first : terms.outer + terms.inner
  };

  // Format expanded expression
  const expanded = `${formatTerm(terms.first, 2)} ${formatTerm(terms.outer, 1)} ${formatTerm(terms.inner, 1)} ${formatTerm(terms.last)}`.trim();

  const steps = [
    {
      step: 'First',
      expression: `${input.firstBinomial.x}x × ${input.secondBinomial.x}x = ${terms.first}x²`,
      explanation: 'Multiply first terms of each binomial'
    },
    {
      step: 'Outer',
      expression: `${input.firstBinomial.x}x × ${input.secondBinomial.constant} = ${terms.outer}x`,
      explanation: 'Multiply outer terms'
    },
    {
      step: 'Inner',
      expression: `${input.firstBinomial.constant} × ${input.secondBinomial.x}x = ${terms.inner}x`,
      explanation: 'Multiply inner terms'
    },
    {
      step: 'Last',
      expression: `${input.firstBinomial.constant} × ${input.secondBinomial.constant} = ${terms.last}`,
      explanation: 'Multiply last terms'
    }
  ];

  const recommendations = [
    {
      category: 'Verification',
      suggestion: 'Check work by multiplying expanded form back to original'
    },
    {
      category: 'Simplification',
      suggestion: simplified.x !== 0 ?
        'Combine like terms for x coefficients' :
        'No like terms to combine'
    },
    {
      category: 'Common Factors',
      suggestion: Math.abs(simplified.coefficient) > 1 ?
        'Look for opportunities to factor out common terms' :
        'No common factors to extract'
    },
    {
      category: 'Next Steps',
      suggestion: 'Consider factoring result if possible'
    }
  ];

  return {
    expanded,
    steps,
    terms,
    simplified,
    recommendations
  };
}