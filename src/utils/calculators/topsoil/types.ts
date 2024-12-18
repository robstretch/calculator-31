export interface TopsoilArea {
  length: number;
  width: number;
  depth: number;
  shape: 'rectangular' | 'circular';
  slopePercent?: number;
}

export interface TopsoilResult {
  cubicYards: number;
  cubicFeet: number;
  tons: number;
  coverage: number;
  estimatedCost: {
    bulk: number;
    bagged: number;
    delivery: number;
    total: number;
  };
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  soilTypes: {
    type: string;
    description: string;
    bestFor: string[];
  }[];
}