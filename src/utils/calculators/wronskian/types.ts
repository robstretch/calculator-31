export interface WronskianInput {
  functions: string[];  // Array of function expressions
  variable: string;     // Usually 'x'
  point: number;        // Point at which to evaluate
}

export interface WronskianResult {
  determinant: number;
  matrix: number[][];
  steps: {
    step: string;
    description: string;
    result: string;
  }[];
  isIndependent: boolean;
  properties: {
    property: string;
    value: string;
    description: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}