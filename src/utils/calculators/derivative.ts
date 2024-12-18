export interface Term {
  coefficient: number;
  exponent: number;
}

export interface DerivativeResult {
  derivative: Term[];
  steps: string[];
  originalFunction: string;
  derivativeFunction: string;
}

function formatTerm(term: Term): string {
  if (term.exponent === 0) return term.coefficient.toString();
  if (term.exponent === 1) return `${term.coefficient === 1 ? '' : term.coefficient}x`;
  return `${term.coefficient === 1 ? '' : term.coefficient}x^${term.exponent}`;
}

export function parsePolynomial(expression: string): Term[] {
  const terms: Term[] = [];
  const parts = expression.replace(/\s/g, '').split(/(?=[+-])/);

  for (const part of parts) {
    if (!part) continue;
    
    if (part === 'x') {
      terms.push({ coefficient: 1, exponent: 1 });
    } else if (part === '-x') {
      terms.push({ coefficient: -1, exponent: 1 });
    } else {
      const match = part.match(/([+-]?\d*)(x?)(?:\^(\d+))?/);
      if (match) {
        let [, coef, hasX, exp] = match;
        const coefficient = coef === '' ? 1 : coef === '-' ? -1 : parseFloat(coef);
        const exponent = !hasX ? 0 : !exp ? 1 : parseInt(exp);
        terms.push({ coefficient, exponent });
      }
    }
  }

  return terms.sort((a, b) => b.exponent - a.exponent);
}

export function calculateDerivative(expression: string): DerivativeResult {
  const terms = parsePolynomial(expression);
  const derivative: Term[] = [];
  const steps: string[] = [];

  steps.push(`Starting with function: f(x) = ${expression}`);

  for (const term of terms) {
    if (term.exponent === 0) {
      steps.push(`The derivative of a constant (${term.coefficient}) is 0`);
      continue;
    }

    const newCoefficient = term.coefficient * term.exponent;
    const newExponent = term.exponent - 1;

    steps.push(
      `For term ${formatTerm(term)}:`,
      `• Multiply coefficient by exponent: ${term.coefficient} × ${term.exponent} = ${newCoefficient}`,
      `• Reduce exponent by 1: ${term.exponent} - 1 = ${newExponent}`
    );

    derivative.push({
      coefficient: newCoefficient,
      exponent: newExponent
    });
  }

  const originalFunction = terms
    .map((term, i) => `${i > 0 && term.coefficient > 0 ? '+' : ''}${formatTerm(term)}`)
    .join('');

  const derivativeFunction = derivative
    .map((term, i) => `${i > 0 && term.coefficient > 0 ? '+' : ''}${formatTerm(term)}`)
    .join('') || '0';

  steps.push(`Final derivative: f'(x) = ${derivativeFunction}`);

  return {
    derivative,
    steps,
    originalFunction,
    derivativeFunction
  };
}