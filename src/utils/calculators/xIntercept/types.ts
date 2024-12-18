export interface XInterceptInput {
  coefficients: number[];  // Coefficients from highest to lowest degree
  range?: {
    min: number;
    max: number;
  };
}

export interface XInterceptResult {
  intercepts: number[];
  steps: {
    method: string;
    expression: string;
    explanation: string;
  }[];
  polynomial: {
    degree: number;
    expression: string;
    derivative: string;
  };
  points: {
    x: number;
    y: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}