export interface TScoreInput {
  value: number;
  mean: number;
  standardDeviation: number;
  sampleSize?: number;
}

export interface TScoreResult {
  tScore: number;
  pValue: number;
  confidenceIntervals: {
    ninety: { lower: number; upper: number };
    ninetyFive: { lower: number; upper: number };
    ninetyNine: { lower: number; upper: number };
  };
  interpretation: {
    significance: string;
    effectSize: string;
    direction: string;
  };
  calculations: {
    step: string;
    formula: string;
    result: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}