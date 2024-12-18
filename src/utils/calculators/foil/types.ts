export interface FOILInput {
  firstBinomial: {
    x: number;
    constant: number;
  };
  secondBinomial: {
    x: number;
    constant: number;
  };
}

export interface FOILResult {
  expanded: string;
  steps: {
    step: string;
    expression: string;
    explanation: string;
  }[];
  terms: {
    first: number;
    outer: number;
    inner: number;
    last: number;
  };
  simplified: {
    coefficient: number;
    x2: number;
    x: number;
    constant: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}