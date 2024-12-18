export interface PHInput {
  concentration: number;
  unit: 'mol/L' | 'g/L';
  substance?: string;
  temperature?: number;
}

export interface PHResult {
  pH: number;
  pOH: number;
  hydrogenIons: number;
  hydroxideIons: number;
  classification: string;
  calculations: {
    step: string;
    formula: string;
    result: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  properties: {
    metric: string;
    value: number;
    description: string;
  }[];
}