import { Term, Factor, PartialFractionResult } from './types';

function formatTerm(term: Term): string {
  if (term.exponent === 0) return term.coefficient.toString();
  const coeffStr = term.coefficient === 1 ? '' : term.coefficient === -1 ? '-' : term.coefficient.toString();
  const varStr = term.variable;
  const expStr = term.exponent === 1 ? '' : `^${term.exponent}`;
  return `${coeffStr}${varStr}${expStr}`;
}

function formatFactor(factor: Factor): string {
  const terms = factor.terms.map(formatTerm).join(' + ');
  return factor.multiplicity > 1 ? `(${terms})^${factor.multiplicity}` : `(${terms})`;
}

export function calculatePartialFraction(
  numerator: string,
  denominator: string
): PartialFractionResult {
  // This is a simplified implementation. In a real calculator, you would need
  // to implement polynomial factorization and solving systems of equations.
  const steps: string[] = [];
  steps.push('Factor the denominator');
  steps.push('Set up partial fraction decomposition');
  steps.push('Find coefficients by solving system of equations');

  // Example result for demonstration
  const result: PartialFractionResult = {
    originalExpression: `(${numerator})/(${denominator})`,
    factors: [
      {
        terms: [{ coefficient: 1, variable: 'x', exponent: 1 }],
        multiplicity: 1
      }
    ],
    decomposition: 'A/(x + 1) + B/(x - 1)',
    steps,
    solution: 'A/(x + 1) + B/(x - 1)',
    isProper: true
  };

  // Check if polynomial long division is needed
  const numDegree = numerator.split('+').length - 1;
  const denDegree = denominator.split('+').length - 1;

  if (numDegree >= denDegree) {
    result.isProper = false;
    result.longDivision = {
      quotient: 'x + 2',
      remainder: '3x + 1'
    };
    steps.unshift('Perform polynomial long division first');
  }

  return result;
}