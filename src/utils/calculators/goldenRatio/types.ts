export interface GoldenRatioInput {
  value: number;
  direction: 'up' | 'down';
}

export interface GoldenRatioResult {
  result: number;
  ratio: number;
  sequence: number[];
  proportions: {
    dimension: string;
    larger: number;
    smaller: number;
  }[];
  applications: {
    field: string;
    example: string;
    ratio: number;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}