export interface RoofPitchInput {
  run: number;
  rise: number;
  unit: 'inches' | 'feet' | 'meters';
  roofWidth: number;
  roofLength: number;
}

export interface RoofPitchResult {
  angle: number;
  ratio: string;
  slope: number;
  measurements: {
    actualLength: number;
    surfaceArea: number;
    verticalRise: number;
  };
  materials: {
    shingles: number;
    underlayment: number;
    nails: number;
    estimatedCost: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  specifications: {
    metric: string;
    value: number;
    description: string;
  }[];
}