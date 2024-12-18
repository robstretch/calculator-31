export interface Term {
  coefficient: number;
  variable: string;
  exponent: number;
}

export interface Factor {
  terms: Term[];
  multiplicity: number;
}

export interface PartialFractionResult {
  originalExpression: string;
  factors: Factor[];
  decomposition: string;
  steps: string[];
  solution: string;
  isProper: boolean;
  longDivision?: {
    quotient: string;
    remainder: string;
  };
}