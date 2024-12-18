export interface AreaBetweenCurvesInput {
  function1: string;
  function2: string;
  lowerBound: number;
  upperBound: number;
  method?: 'simpsons' | 'trapezoidal';
  intervals?: number;
}

export interface AreaBetweenCurvesResult {
  area: number;
  intersectionPoints: number[];
  steps: {
    step: string;
    formula: string;
    result: number;
  }[];
  visualPoints: {
    x: number;
    y1: number;
    y2: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}