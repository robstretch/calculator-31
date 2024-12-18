export interface IntegralInput {
  expression: string;
  lowerBound?: number;
  upperBound?: number;
  variable?: string;
}

export interface IntegralResult {
  antiderivative: string;
  steps: {
    rule: string;
    expression: string;
    explanation: string;
  }[];
  definiteResult?: number;
  visualPoints?: {
    x: number;
    y: number;
  }[];
  rules: {
    name: string;
    formula: string;
    example: string;
  }[];
}