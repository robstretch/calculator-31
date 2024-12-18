export interface HeronsInput {
  sideA: number;
  sideB: number;
  sideC: number;
  unit?: 'meters' | 'feet';
}

export interface HeronsResult {
  area: number;
  semiperimeter: number;
  angles: {
    A: number;
    B: number;
    C: number;
  };
  steps: {
    step: string;
    formula: string;
    result: number;
  }[];
  validation: {
    isValid: boolean;
    message: string;
  };
  properties: {
    type: string;
    description: string;
    ratio?: string;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}