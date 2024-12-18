import { SimpsonsInput, SimpsonsResult } from './types';

function evaluateFunction(expression: string, x: number): number {
  // Simple evaluation for basic expressions
  return eval(expression.replace(/x/g, x.toString()));
}

function calculateFourthDerivative(expression: string, x: number): number {
  const h = 0.0001;
  const f1 = evaluateFunction(expression, x - 2*h);
  const f2 = evaluateFunction(expression, x - h);
  const f3 = evaluateFunction(expression, x);
  const f4 = evaluateFunction(expression, x + h);
  const f5 = evaluateFunction(expression, x + 2*h);
  
  return (f1 - 4*f2 + 6*f3 - 4*f4 + f5) / Math.pow(h, 4);
}

export function calculateSimpsons(input: SimpsonsInput): SimpsonsResult {
  const h = (input.upperBound - input.lowerBound) / input.intervals;
  const steps = [];
  let sum = evaluateFunction(input.function, input.lowerBound) + 
            evaluateFunction(input.function, input.upperBound);
  
  steps.push({
    step: 'Initial Values',
    formula: 'f(a) + f(b)',
    value: sum
  });

  // Calculate odd terms
  let oddSum = 0;
  for (let i = 1; i < input.intervals; i += 2) {
    const x = input.lowerBound + i * h;
    oddSum += evaluateFunction(input.function, x);
  }
  oddSum *= 4;
  
  steps.push({
    step: 'Odd Terms',
    formula: '4 × Σf(x₂ᵢ₋₁)',
    value: oddSum
  });

  // Calculate even terms
  let evenSum = 0;
  for (let i = 2; i < input.intervals; i += 2) {
    const x = input.lowerBound + i * h;
    evenSum += evaluateFunction(input.function, x);
  }
  evenSum *= 2;
  
  steps.push({
    step: 'Even Terms',
    formula: '2 × Σf(x₂ᵢ)',
    value: evenSum
  });

  // Calculate final result
  const result = (h / 3) * (sum + oddSum + evenSum);
  
  steps.push({
    step: 'Final Result',
    formula: '(h/3) × (sum + oddSum + evenSum)',
    value: result
  });

  // Generate points for visualization
  const points = [];
  const numPoints = Math.min(100, input.intervals * 2);
  const step = (input.upperBound - input.lowerBound) / numPoints;
  
  for (let i = 0; i <= numPoints; i++) {
    const x = input.lowerBound + i * step;
    points.push({
      x,
      y: evaluateFunction(input.function, x)
    });
  }

  // Estimate error
  const M = Math.max(
    ...points.map(p => Math.abs(calculateFourthDerivative(input.function, p.x)))
  );
  const errorBound = (M * Math.pow(input.upperBound - input.lowerBound, 5)) / 
                    (180 * Math.pow(input.intervals, 4));

  const recommendations = [
    {
      category: 'Accuracy',
      suggestion: input.intervals < 10 ?
        'Increase number of intervals for better accuracy' :
        'Current interval count provides good accuracy'
    },
    {
      category: 'Error Estimation',
      suggestion: errorBound > 0.01 ?
        'Consider using more intervals to reduce error' :
        'Error bound is within acceptable range'
    },
    {
      category: 'Function Complexity',
      suggestion: 'Verify function is continuous on the interval'
    },
    {
      category: 'Interval Selection',
      suggestion: 'Use even number of intervals for Simpson\'s rule'
    }
  ];

  return {
    result,
    steps,
    points,
    error: {
      absolute: errorBound,
      relative: errorBound / Math.abs(result),
      bound: errorBound
    },
    recommendations
  };
}