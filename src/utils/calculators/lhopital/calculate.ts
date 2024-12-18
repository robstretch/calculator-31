import { LHopitalInput, LHopitalResult } from './types';

function evaluateExpression(expression: string, x: number): number {
  // Simple evaluation for basic expressions
  return eval(expression.replace(/x/g, x.toString()));
}

function getDerivative(expression: string): string {
  // Simple derivative rules for basic expressions
  if (expression.includes('x^')) {
    const [base, power] = expression.split('^');
    const newPower = parseInt(power) - 1;
    const coefficient = parseInt(power);
    return `${coefficient}x^${newPower}`;
  }
  if (expression === 'x') return '1';
  if (!expression.includes('x')) return '0';
  return expression;
}

function getIndeterminateForm(
  numerator: string,
  denominator: string,
  point: number
): string {
  try {
    const numValue = evaluateExpression(numerator, point);
    const denValue = evaluateExpression(denominator, point);

    if (isNaN(numValue) && isNaN(denValue)) return '0/0';
    if (!isFinite(numValue) && !isFinite(denValue)) return '∞/∞';
    return 'not indeterminate';
  } catch {
    return '0/0'; // Default to 0/0 for complex expressions
  }
}

export function calculateLHopital(input: LHopitalInput): LHopitalResult {
  const steps = [];
  const numDerivatives = [input.numerator];
  const denDerivatives = [input.denominator];
  let currentNum = input.numerator;
  let currentDen = input.denominator;
  let limit: number | 'undefined' | '∞' | '-∞' = 'undefined';
  let iteration = 0;
  const maxIterations = 5;

  const indeterminateForm = getIndeterminateForm(
    input.numerator,
    input.denominator,
    input.point
  );

  while (iteration < maxIterations) {
    try {
      const numValue = evaluateExpression(currentNum, input.point);
      const denValue = evaluateExpression(currentDen, input.point);

      steps.push({
        iteration,
        numerator: currentNum,
        denominator: currentDen,
        value: `${numValue}/${denValue}`,
        explanation: `Evaluating at x = ${input.point}`
      });

      if (isFinite(numValue) && isFinite(denValue) && denValue !== 0) {
        limit = numValue / denValue;
        break;
      }

      if (denValue === 0 && numValue > 0) {
        limit = '∞';
        break;
      }

      if (denValue === 0 && numValue < 0) {
        limit = '-∞';
        break;
      }

      // Take derivatives
      currentNum = getDerivative(currentNum);
      currentDen = getDerivative(currentDen);
      numDerivatives.push(currentNum);
      denDerivatives.push(currentDen);
      iteration++;

    } catch (error) {
      break;
    }
  }

  const recommendations = [
    {
      category: 'Verification',
      suggestion: 'Check result using graphical analysis'
    },
    {
      category: 'Alternative Methods',
      suggestion: indeterminateForm === '∞/∞' ?
        'Consider algebraic simplification first' :
        'Consider factoring before applying L\'Hôpital\'s Rule'
    },
    {
      category: 'Convergence',
      suggestion: iteration >= maxIterations ?
        'Limit may not exist or require different approach' :
        'Solution converged successfully'
    },
    {
      category: 'Domain',
      suggestion: 'Verify solution on both sides of the point'
    }
  ];

  return {
    limit,
    steps,
    indeterminateForm,
    derivatives: {
      numerator: numDerivatives,
      denominator: denDerivatives
    },
    recommendations
  };
}