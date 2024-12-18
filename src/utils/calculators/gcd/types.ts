export interface GCDInput {
  numbers: number[];
}

export interface GCDResult {
  gcd: number;
  steps: {
    numbers: number[];
    explanation: string;
  }[];
  factors: {
    number: number;
    primeFactors: number[];
  }[];
  properties: {
    category: string;
    description: string;
  }[];
  applications: {
    field: string;
    example: string;
  }[];
}