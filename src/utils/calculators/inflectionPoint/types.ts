export interface InflectionPointInput {
  expression: string;
  range?: {
    min: number;
    max: number;
  };
}

export interface InflectionPointResult {
  points: {
    x: number;
    y: number;
    type: 'inflection' | 'critical';
  }[];
  derivatives: {
    first: string;
    second: string;
  };
  steps: {
    step: string;
    expression: string;
    explanation: string;
  }[];
  visualPoints: {
    x: number;
    y: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}