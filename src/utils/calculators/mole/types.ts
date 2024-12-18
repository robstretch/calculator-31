export interface MoleInput {
  value: number;
  molarMass: number;
  volume?: number;
  calculationType: 'moles-to-grams' | 'grams-to-moles' | 'molarity';
}

export interface MoleResult {
  result: number;
  steps: {
    step: string;
    formula: string;
    value: number;
  }[];
  conversions: {
    moles?: number;
    grams?: number;
    molarity?: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}