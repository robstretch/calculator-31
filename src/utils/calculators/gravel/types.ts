export interface GravelArea {
  length: number;
  width: number;
  depth: number;
  shape: 'rectangular' | 'circular';
}

export interface GravelResult {
  cubicYards: number;
  cubicFeet: number;
  tons: number;
  coverage: number;
  estimatedCost: {
    gravel: number;
    delivery: number;
    total: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}