import { IntegralInput, IntegralResult } from './types';

function evaluateExpression(expression: string, x: number): number {
  // Simple evaluation for basic expressions
  return eval(expression.replace(/x/g, x.toString()));
}

export function calculateIntegral(input: IntegralInput): IntegralResult {
  const steps = [];
  let antiderivative = '';
  let definiteResult: number | undefined;

  // Basic integration rules
  const rules = [
    {
      name: 'Power Rule',
      formula: '∫xⁿ dx = (xⁿ⁺¹)/(n+1) + C',
      example: '∫x² dx = x³/3 + C'
    },
    {
      name: 'Constant Rule',
      formula: '∫a dx = ax + C',
      example: '∫5 dx = 5x + C'
    },
    {
      name: 'Sum Rule',
      formula: '∫(f(x) + g(x)) dx = ∫f(x) dx + ∫g(x) dx',
      example: '∫(x² + x) dx = x³/3 + x²/2 + C'
    },
    {
      name: 'Exponential Rule',
      formula: '∫eˣ dx = eˣ + C',
      example: '∫eˣ dx = eˣ + C'
    }
  ];

  // Simple pattern matching for basic integrals
  if (input.expression.match(/^x\^?\d*$/)) {
    const power = input.expression.split('^')[1] || '1';
    const newPower = parseInt(power) + 1;
    antiderivative = `(x^${newPower})/${newPower}`;
    
    steps.push({
      rule: 'Power Rule',
      expression: antiderivative,
      explanation: `Increase power by 1 and divide by new power`
    });
  } else if (input.expression.match(/^\d+$/)) {
    antiderivative = `${input.expression}x`;
    steps.push({
      rule: 'Constant Rule',
      expression: antiderivative,
      explanation: 'Multiply constant by x'
    });
  }

  // Calculate definite integral if bounds provided
  if (input.lowerBound !== undefined && input.upperBound !== undefined && antiderivative) {
    const upperResult = evaluateExpression(antiderivative, input.upperBound);
    const lowerResult = evaluateExpression(antiderivative, input.lowerBound);
    definiteResult = upperResult - lowerResult;

    steps.push({
      rule: 'Definite Integral',
      expression: `[${antiderivative}]_{${input.lowerBound}}^{${input.upperBound}}`,
      explanation: `Evaluate antiderivative at upper bound minus lower bound`
    });
  }

  // Generate visualization points
  const visualPoints = [];
  if (input.lowerBound !== undefined && input.upperBound !== undefined) {
    const points = 50;
    const step = (input.upperBound - input.lowerBound) / points;
    for (let i = 0; i <= points; i++) {
      const x = input.lowerBound + i * step;
      try {
        const y = evaluateExpression(input.expression, x);
        visualPoints.push({ x, y });
      } catch (e) {
        // Skip invalid points
      }
    }
  }

  return {
    antiderivative: antiderivative + ' + C',
    steps,
    definiteResult,
    visualPoints,
    rules
  };
}