export interface SimpsonsInput {
  function: string;
  lowerBound: number;
  upperBound: number;
  intervals: number;
}

export interface SimpsonsResult {
  result: number;
  steps: {
    step: string;
    formula: string;
    value: number;
  }[];
  points: {
    x: number;
    y: number;
  }[];
  error: {
    absolute: number;
    relative: number;
    bound: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}