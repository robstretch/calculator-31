import { WronskianInput, WronskianResult } from './types';

function evaluateDerivative(expression: string, x: number, order: number): number {
  // Simple numerical derivative using central difference
  const h = 0.0001;
  if (order === 0) {
    return eval(expression.replace(/x/g, x.toString()));
  }
  return (evaluateDerivative(expression, x + h, order - 1) - 
          evaluateDerivative(expression, x - h, order - 1)) / (2 * h);
}

function calculateDeterminant(matrix: number[][]): number {
  const n = matrix.length;
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  
  let det = 0;
  for (let i = 0; i < n; i++) {
    const subMatrix = matrix.slice(1).map(row => 
      row.filter((_, index) => index !== i)
    );
    det += matrix[0][i] * calculateDeterminant(subMatrix) * (i % 2 ? -1 : 1);
  }
  return det;
}

export function calculateWronskian(input: WronskianInput): WronskianResult {
  const n = input.functions.length;
  const matrix: number[][] = [];
  const steps = [];

  // Build Wronskian matrix
  for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
      matrix[i][j] = evaluateDerivative(input.functions[i], input.point, j);
    }
  }

  steps.push({
    step: 'Build Matrix',
    description: 'Evaluate functions and their derivatives',
    result: `W(${input.point}) = ${JSON.stringify(matrix)}`
  });

  // Calculate determinant
  const determinant = calculateDeterminant(matrix);

  steps.push({
    step: 'Calculate Determinant',
    description: 'Compute Wronskian determinant',
    result: determinant.toFixed(4)
  });

  // Determine linear independence
  const isIndependent = Math.abs(determinant) > 0.0001;

  steps.push({
    step: 'Check Independence',
    description: 'Verify if Wronskian is non-zero',
    result: isIndependent ? 'Functions are linearly independent' : 'Functions are linearly dependent'
  });

  const properties = [
    {
      property: 'Order',
      value: n.toString(),
      description: 'Number of functions in the set'
    },
    {
      property: 'Evaluation Point',
      value: input.point.toString(),
      description: 'Point at which Wronskian is evaluated'
    },
    {
      property: 'Determinant',
      value: determinant.toFixed(4),
      description: 'Value of Wronskian determinant'
    }
  ];

  const recommendations = [
    {
      category: 'Verification',
      suggestion: isIndependent ?
        'Verify independence at multiple points for stronger conclusion' :
        'Check for linear combinations between functions'
    },
    {
      category: 'Application',
      suggestion: isIndependent ?
        'Functions can form a fundamental set of solutions' :
        'Consider finding alternative functions'
    },
    {
      category: 'Analysis',
      suggestion: Math.abs(determinant) < 1 ?
        'Consider scaling functions for numerical stability' :
        'Good numerical stability'
    },
    {
      category: 'Further Steps',
      suggestion: 'Consider checking for special properties like constant Wronskian'
    }
  ];

  return {
    determinant,
    matrix,
    steps,
    isIndependent,
    properties,
    recommendations
  };
}