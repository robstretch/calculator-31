export interface StairDimensions {
  totalRise: number;
  totalRun: number;
  headroom?: number;
  width?: number;
}

export interface StairResult {
  numberOfSteps: number;
  riserHeight: number;
  treadDepth: number;
  totalLength: number;
  angle: number;
  isWithinCode: boolean;
  codeViolations: string[];
  materials: {
    stringers: number;
    treads: number;
    risers: number;
    lumber: {
      type: string;
      amount: number;
      unit: string;
    }[];
  };
  estimatedCost: {
    lumber: number;
    hardware: number;
    total: number;
  };
}