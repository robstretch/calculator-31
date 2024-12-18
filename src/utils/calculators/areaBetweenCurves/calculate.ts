import { AreaBetweenCurvesInput, AreaBetweenCurvesResult } from './types';

function evaluateFunction(expression: string, x: number): number {
  // Simple evaluation for basic expressions
  return eval(expression.replace(/x/g, x.toString()));
}

function findIntersections(f1: string, f2: string, a: number, b: number): number[] {
  const intersections = [];
  const step = (b - a) / 1000;

  for (let x = a; x <= b; x += step) {
    const y1 = evaluateFunction(f1, x);
    const y2 = evaluateFunction(f2, x);
    const y1Next = evaluateFunction(f1, x + step);
    const y2Next = evaluateFunction(f2, x + step);

    if ((y1 - y2) * (y1Next - y2Next) <= 0) {
      // Binary search for more precise intersection
      let left = x;
      let right = x + step;
      for (let i = 0; i < 10; i++) {
        const mid = (left + right) / 2;
        const midY1 = evaluateFunction(f1, mid);
        const midY2 = evaluateFunction(f2, mid);
        if (Math.abs(midY1 - midY2) < 0.0001) {
          intersections.push(Math.round(mid * 1000) / 1000);
          break;
        }
        if ((midY1 - midY2) * (evaluateFunction(f1, left) - evaluateFunction(f2, left)) > 0) {
          left = mid;
        } else {
          right = mid;
        }
      }
    }
  }

  return intersections;
}

function simpsonsRule(f1: string, f2: string, a: number, b: number, n: number): number {
  const h = (b - a) / n;
  let sum = evaluateFunction(f1, a) - evaluateFunction(f2, a);
  sum += evaluateFunction(f1, b) - evaluateFunction(f2, b);

  for (let i = 1; i < n; i += 2) {
    const x = a + i * h;
    sum += 4 * (evaluateFunction(f1, x) - evaluateFunction(f2, x));
  }

  for (let i = 2; i < n - 1; i += 2) {
    const x = a + i * h;
    sum += 2 * (evaluateFunction(f1, x) - evaluateFunction(f2, x));
  }

  return Math.abs((h / 3) * sum);
}

export function calculateAreaBetweenCurves(input: AreaBetweenCurvesInput): AreaBetweenCurvesResult {
  const steps = [];
  const intervals = input.intervals || 1000;

  // Find intersection points
  const intersectionPoints = findIntersections(
    input.function1,
    input.function2,
    input.lowerBound,
    input.upperBound
  );

  // Calculate area using Simpson's Rule
  const area = simpsonsRule(
    input.function1,
    input.function2,
    input.lowerBound,
    input.upperBound,
    intervals
  );

  steps.push({
    step: 'Find Intersection Points',
    formula: 'f₁(x) = f₂(x)',
    result: intersectionPoints.length
  });

  steps.push({
    step: 'Calculate Area',
    formula: '∫[f₁(x) - f₂(x)]dx',
    result: area
  });

  // Generate points for visualization
  const visualPoints = [];
  const step = (input.upperBound - input.lowerBound) / 100;
  for (let x = input.lowerBound; x <= input.upperBound; x += step) {
    visualPoints.push({
      x,
      y1: evaluateFunction(input.function1, x),
      y2: evaluateFunction(input.function2, x)
    });
  }

  const recommendations = [
    {
      category: 'Accuracy',
      suggestion: intervals < 100 ?
        'Increase number of intervals for better accuracy' :
        'Current interval count provides good accuracy'
    },
    {
      category: 'Integration Method',
      suggestion: 'Simpson\'s Rule provides good balance of accuracy and speed'
    },
    {
      category: 'Domain',
      suggestion: intersectionPoints.length > 0 ?
        'Multiple intersection points found - verify domain' :
        'No intersection points in given domain'
    },
    {
      category: 'Verification',
      suggestion: 'Cross-check result with graphical representation'
    }
  ];

  return {
    area: Math.round(area * 1000) / 1000,
    intersectionPoints,
    steps,
    visualPoints,
    recommendations
  };
}