import { InflectionPointInput, InflectionPointResult } from './types';

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

function findRoots(expression: string, range: { min: number; max: number }): number[] {
  const roots = [];
  const step = 0.1;
  
  for (let x = range.min; x <= range.max; x += step) {
    const y1 = evaluateExpression(expression, x);
    const y2 = evaluateExpression(expression, x + step);
    
    if (y1 * y2 <= 0) {
      // Root found in this interval, refine using bisection method
      let left = x;
      let right = x + step;
      for (let i = 0; i < 10; i++) {
        const mid = (left + right) / 2;
        const midY = evaluateExpression(expression, mid);
        if (Math.abs(midY) < 0.0001) {
          roots.push(Math.round(mid * 1000) / 1000);
          break;
        }
        if (midY * evaluateExpression(expression, left) < 0) {
          right = mid;
        } else {
          left = mid;
        }
      }
    }
  }
  
  return roots;
}

export function calculateInflectionPoints(input: InflectionPointInput): InflectionPointResult {
  const range = input.range || { min: -10, max: 10 };
  const steps = [];
  
  // Calculate first derivative
  const firstDerivative = getDerivative(input.expression);
  steps.push({
    step: 'First Derivative',
    expression: firstDerivative,
    explanation: 'Find rate of change'
  });
  
  // Calculate second derivative
  const secondDerivative = getDerivative(firstDerivative);
  steps.push({
    step: 'Second Derivative',
    expression: secondDerivative,
    explanation: 'Find concavity change'
  });
  
  // Find critical points (roots of first derivative)
  const criticalPoints = findRoots(firstDerivative, range);
  steps.push({
    step: 'Critical Points',
    expression: `x = ${criticalPoints.join(', ')}`,
    explanation: 'Points where first derivative equals zero'
  });
  
  // Find inflection points (roots of second derivative)
  const inflectionPoints = findRoots(secondDerivative, range);
  steps.push({
    step: 'Inflection Points',
    expression: `x = ${inflectionPoints.join(', ')}`,
    explanation: 'Points where second derivative equals zero'
  });
  
  // Combine all points
  const points = [
    ...criticalPoints.map(x => ({
      x,
      y: evaluateExpression(input.expression, x),
      type: 'critical' as const
    })),
    ...inflectionPoints.map(x => ({
      x,
      y: evaluateExpression(input.expression, x),
      type: 'inflection' as const
    }))
  ];
  
  // Generate visualization points
  const visualPoints = [];
  const step = (range.max - range.min) / 100;
  for (let x = range.min; x <= range.max; x += step) {
    try {
      const y = evaluateExpression(input.expression, x);
      visualPoints.push({ x, y });
    } catch (e) {
      // Skip invalid points
    }
  }
  
  const recommendations = [
    {
      category: 'Analysis',
      suggestion: points.length === 0 ?
        'No inflection points found in given range' :
        `Found ${points.length} points of interest`
    },
    {
      category: 'Range',
      suggestion: range.max - range.min > 20 ?
        'Consider narrowing range for more precise results' :
        'Range is appropriate for analysis'
    },
    {
      category: 'Verification',
      suggestion: 'Cross-check results with graphical analysis'
    },
    {
      category: 'Applications',
      suggestion: 'Use inflection points to analyze function behavior'
    }
  ];

  return {
    points,
    derivatives: {
      first: firstDerivative,
      second: secondDerivative
    },
    steps,
    visualPoints,
    recommendations
  };
}