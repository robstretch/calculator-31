export interface CAGRInput {
  initialValue: number;
  finalValue: number;
  years: number;
  adjustForInflation?: boolean;
  inflationRate?: number;
}

export interface CAGRResult {
  cagr: number;
  realCAGR?: number;
  totalGrowth: number;
  projections: {
    year: number;
    value: number;
    realValue?: number;
  }[];
  analysis: {
    metric: string;
    value: number;
    description: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}