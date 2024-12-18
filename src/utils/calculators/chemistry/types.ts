export interface ChemistryInput {
  type: 'molarity' | 'stoichiometry' | 'dilution';
  moles?: number;
  volume?: number;
  volumeUnit?: 'L' | 'mL';
  concentration?: number;
  molecularWeight?: number;
}

export interface ChemistryResult {
  molarity?: number;
  concentration?: number;
  mass?: number;
  volume?: number;
  steps: {
    step: string;
    formula: string;
    result: string;
  }[];
  conversions: {
    from: string;
    to: string;
    value: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  safetyInfo: {
    hazard: string;
    precaution: string;
  }[];
}