export interface LHopitalInput {
  numerator: string;
  denominator: string;
  point: number;
}

export interface LHopitalResult {
  limit: number | 'undefined' | '∞' | '-∞';
  steps: {
    iteration: number;
    numerator: string;
    denominator: string;
    value: string;
    explanation: string;
  }[];
  indeterminateForm: string;
  derivatives: {
    numerator: string[];
    denominator: string[];
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}