export interface SandArea {
  length: number;
  width: number;
  depth: number;
  shape: 'rectangular' | 'circular';
}

export interface SandResult {
  cubicYards: number;
  cubicFeet: number;
  tons: number;
  coverage: number;
  bagsNeeded: number;
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
}