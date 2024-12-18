import { XInterceptInput, XInterceptResult } from './types';

function formatPolynomial(coefficients: number[]): string {
  return coefficients
    .map((coef, i) => {
      const degree = coefficients.length - 1 - i;
      if (coef === 0) return '';
      const sign = coef > 0 && i !== 0 ? '+' : '';
      const value = Math.abs(coef) === 1 && degree > 0 ? '' : Math.abs(coef);
      const x = degree === 0 ? '' : degree === 1 ? 'x' : `x^${degree}`;
      return `${sign}${coef < 0 ? '-' : ''}${value}${x}`;
    })
    .filter(term => term !== '')
    .join('');
}

function evaluatePolynomial(coefficients: number[], x: number): number {
  return coefficients.reduce((sum, coef, i) => {
    const degree = coefficients.length - 1 - i;
    return sum + coef * Math.pow(x, degree);
  }, 0);
}

function findRoots(coefficients: number[]): number[] {
  const degree = coefficients.length - 1;
  
  if (degree === 1) {
    // Linear equation: ax + b = 0
    return [-coefficients[1] / coefficients[0]];
  }
  
  if (degree === 2) {
    // Quadratic equation: ax² + bx + c = 0
    const [a, b, c] = coefficients;
    const discriminant = b * b - 4 * a * c;
    
    if (discriminant < 0) return [];
    if (discriminant === 0) return [-b / (2 * a)];
    
    return [
      (-b + Math.sqrt(discriminant)) / (2 * a),
      (-b - Math.sqrt(discriminant)) / (2 * a)
    ];
  }
  
  // For higher degrees, use numerical method (Newton's method)
  const roots = [];
  const range = { min: -10, max: 10 };
  const step = 0.1;
  
  for (let x = range.min; x <= range.max; x += step) {
    const y1 = evaluatePolynomial(coefficients, x);
    const y2 = evaluatePolynomial(coefficients, x + step);
    
    if (y1 * y2 <= 0) {
      // Root found in this interval, refine using Newton's method
      let root = x;
      for (let i = 0; i < 10; i++) {
        const y = evaluatePolynomial(coefficients, root);
        const derivative = evaluatePolynomial(
          coefficients.map((c, i) => c * (coefficients.length - 1 - i)).slice(0, -1),
          root
        );
        root = root - y / derivative;
      }
      roots.push(Math.round(root * 1000) / 1000);
    }
  }
  
  return roots;
}

export function calculateXIntercepts(input: XInterceptInput): XInterceptResult {
  const intercepts = findRoots(input.coefficients);
  const degree = input.coefficients.length - 1;
  const expression = formatPolynomial(input.coefficients);
  
  // Calculate derivative coefficients
  const derivativeCoefficients = input.coefficients
    .map((c, i) => c * (input.coefficients.length - 1 - i))
    .slice(0, -1);
  
  const derivative = formatPolynomial(derivativeCoefficients);
  
  // Generate points for graphing
  const range = input.range || { min: -10, max: 10 };
  const points = [];
  const step = (range.max - range.min) / 100;
  
  for (let x = range.min; x <= range.max; x += step) {
    points.push({
      x,
      y: evaluatePolynomial(input.coefficients, x)
    });
  }
  
  const steps = [
    {
      method: 'Function Analysis',
      expression,
      explanation: `Polynomial of degree ${degree}`
    },
    {
      method: 'Derivative',
      expression: derivative,
      explanation: 'First derivative for finding critical points'
    }
  ];
  
  if (degree <= 2) {
    steps.push({
      method: 'Direct Solution',
      expression: degree === 1 ? 'x = -b/a' : 'x = (-b ± √(b² - 4ac)) / 2a',
      explanation: `Using ${degree === 1 ? 'linear' : 'quadratic'} formula`
    });
  } else {
    steps.push({
      method: 'Numerical Method',
      expression: 'Newton\'s Method',
      explanation: 'Using iterative approximation'
    });
  }
  
  const recommendations = [
    {
      category: 'Method',
      suggestion: degree <= 2 ? 
        'Direct algebraic solution available' :
        'Consider numerical approximation'
    },
    {
      category: 'Verification',
      suggestion: 'Substitute x-values back to verify'
    },
    {
      category: 'Graphical Analysis',
      suggestion: 'Check graph for visual confirmation'
    },
    {
      category: 'Domain',
      suggestion: 'Consider complex roots if no real solutions'
    }
  ];

  return {
    intercepts,
    steps,
    polynomial: {
      degree,
      expression,
      derivative
    },
    points,
    recommendations
  };
}