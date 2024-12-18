export interface Element {
  symbol: string;
  mass: number;
  count: number;
}

export interface AtomicMassResult {
  totalMass: number;
  composition: {
    element: string;
    mass: number;
    percentage: number;
  }[];
  molarMass: number;
  empiricalFormula: string;
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